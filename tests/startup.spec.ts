import { expect, test } from "@playwright/test";

const splash = ".startup-screen";
const initialized = ".startup-content[data-startup-state='done']";

test("mostra a arte oficial, anima a barra e repete ao recarregar", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(splash)).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator(".startup-artwork > img")
        .evaluate((img) => (img as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  const bar = page.getByRole("progressbar", {
    name: "Inicialização da plataforma",
  });
  const before = Number(await bar.getAttribute("aria-valuenow"));
  expect(before).toBeLessThan(100);
  await expect
    .poll(async () => Number(await bar.getAttribute("aria-valuenow")))
    .toBeGreaterThan(before);
  await expect(page.locator(splash)).toBeHidden();
  await expect(page.locator(initialized)).toBeVisible();
  await expect(page.locator(".brand-image").first()).toBeVisible();
  expect(
    await page
      .locator(".brand-image")
      .first()
      .evaluate((img) => (img as HTMLImageElement).naturalWidth),
  ).toBeGreaterThan(0);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator(splash)).toBeVisible();
  await expect(page.locator(splash)).toBeHidden();
  expect(errors).toEqual([]);
});

test("preserva rotas internas na recarga e não reinicia na troca de ambiente", async ({
  page,
}) => {
  await page.goto("/industry/desempenho", { waitUntil: "domcontentloaded" });
  await expect(page.locator(splash)).toBeVisible();
  await expect(page.locator(splash)).toBeHidden();
  await expect(page).toHaveURL("/industry/desempenho");
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator(splash)).toBeVisible();
  await expect(page.locator(splash)).toBeHidden();
  await expect(page).toHaveURL("/industry/desempenho");
  // Observe even short-lived reinsertion during client navigation.
  await page.evaluate(() => {
    const checks = { splashReinserted: false };
    (window as Window & { startupChecks?: typeof checks }).startupChecks =
      checks;
    new MutationObserver(() => {
      if (document.querySelector(".startup-screen"))
        checks.splashReinserted = true;
    }).observe(document.body, { childList: true, subtree: true });
  });
  await page
    .getByRole("link", { name: "VIRTEON Industry — mudar para EDU" })
    .click();
  await expect(page).toHaveURL("/edu");
  await expect(
    page.locator(".edu-platform:visible .sidebar .brand-image"),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "VIRTEON Edu — mudar para Industry" })
    .click();
  await expect(page).toHaveURL("/industry");
  expect(
    await page.evaluate(
      () =>
        (window as Window & { startupChecks?: { splashReinserted: boolean } })
          .startupChecks?.splashReinserted,
    ),
  ).toBe(false);
});

test("aguarda a imagem e o documento antes de concluir o progresso", async ({
  page,
}) => {
  let releaseImage!: () => void;
  const imageGate = new Promise<void>((resolve) => {
    releaseImage = resolve;
  });
  await page.route("**/virteon-splash.jpg", async (route) => {
    await imageGate;
    await route.continue();
  });
  await page.goto("/edu", { waitUntil: "domcontentloaded" });
  await expect(page.locator(splash)).toBeVisible();
  const bar = page.getByRole("progressbar", {
    name: "Inicialização da plataforma",
  });
  await expect
    .poll(async () => Number(await bar.getAttribute("aria-valuenow")))
    .toBe(94);
  await expect(page.locator(splash)).toHaveAttribute("data-phase", "loading");
  releaseImage();
  await expect(page.locator(splash)).toBeHidden();
  await expect(page).toHaveURL("/edu");
});

for (const width of [390, 768, 1365]) {
  test(`arte proporcional e viewport sem scroll durante a splash em ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(splash)).toBeVisible();
    const geometry = await page.evaluate(() => {
      const bounds = document
        .querySelector(".startup-screen")!
        .getBoundingClientRect();
      const art = document
        .querySelector(".startup-artwork")!
        .getBoundingClientRect();
      return {
        width: bounds.width,
        height: bounds.height,
        ratio: art.width / art.height,
        overflow: getComputedStyle(document.documentElement).overflow,
        scrollWidth: document.documentElement.scrollWidth,
      };
    });
    expect(geometry.width).toBe(width);
    expect(geometry.height).toBe(900);
    expect(geometry.ratio).toBeCloseTo(1.5, 2);
    expect(geometry.overflow).toBe("hidden");
    expect(geometry.scrollWidth).toBe(width);
    await expect(page.locator(splash)).toBeHidden();
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).overflow,
      ),
    ).not.toBe("hidden");
  });
}

test("respeita movimento reduzido e libera a página se a arte falhar", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/virteon-splash.jpg", (route) => route.abort());
  await page.goto("/edu", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".startup-fallback")).toBeVisible();
  expect(
    await page
      .locator(".startup-artwork")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await expect(page.locator(splash)).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page).toHaveURL("/edu");
});
