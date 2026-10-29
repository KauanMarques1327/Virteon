import { expect, test } from "@playwright/test";

test("navega entre início, Industry e EDU sem recarregar o documento", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => {
    (window as Window & { navigationMarker?: string }).navigationMarker =
      "virteon";
  });
  await page
    .getByRole("link", { name: "Conhecer Virteon", exact: true })
    .click();
  await expect(page).toHaveURL("/industry");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Seu próximo passo é mais segurança.",
  );
  await page
    .getByRole("link", { name: "VIRTEON Industry — mudar para EDU" })
    .click();
  await expect(page).toHaveURL("/edu");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Grandes descobertas começam com você.",
  );
  await page
    .getByRole("link", { name: "VIRTEON Edu — mudar para Industry" })
    .click();
  await expect(page).toHaveURL("/industry");
  expect(
    await page.evaluate(
      () => (window as Window & { navigationMarker?: string }).navigationMarker,
    ),
  ).toBe("virteon");
});

test("filtra o catálogo e responde às ações futuras", async ({ page }) => {
  await page.goto("/industry");
  await expect(page.locator(".training-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Obrigatórios", exact: true }).click();
  await expect(page.locator(".training-card")).toHaveCount(1);
  await page
    .getByRole("button", {
      name: "Bloqueio e etiquetagem de energia",
      exact: true,
    })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Funcionalidade em desenvolvimento",
  );
  await page.getByRole("button", { name: "Concluídos", exact: true }).click();
  await expect(page.locator(".training-card")).toHaveCount(1);
  await expect(page.locator(".training-card")).toContainText(
    "Inspeção e uso correto de EPIs",
  );
});

test("busca o treinamento, abre a prévia e exporta o relatório", async ({
  page,
}) => {
  await page.goto("/industry");
  await page
    .getByRole("textbox", { name: "Buscar na plataforma" })
    .fill("vazamento");
  await page.locator(".search-results").getByRole("link").click();
  await expect(page).toHaveURL("/industry/treinamentos/vazamento-de-aco");
  await page.getByRole("button", { name: "Abrir prévia do cenário" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect
    .poll(() =>
      page
        .getByRole("dialog")
        .locator("img")
        .evaluate((img) => (img as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page
    .getByRole("button", { name: "Continuar na Web", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Simulação Web em desenvolvimento",
  );
  await page.getByRole("link", { name: "Meu desempenho", exact: true }).click();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exportar relatório" }).click();
  expect((await download).suggestedFilename()).toBe(
    "virteon-relatorio-joao-martins.csv",
  );
});

test("EDU informa bloqueios de missões", async ({ page }) => {
  await page.goto("/edu");
  await page
    .getByRole("button", {
      name: "O aço pode renascer? — missão bloqueada",
      exact: true,
    })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Conclua a missão anterior",
  );
});

for (const width of [360, 390, 768, 1365]) {
  test(`rotas e imagens sem erros ou transbordamento em ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of [
      "/",
      "/industry",
      "/edu",
      "/industry/treinamentos/vazamento-de-aco",
      "/industry/desempenho",
    ]) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.getByRole("heading", { level: 1 }).waitFor();
      // Scroll through the page to load native lazy images and reveal sections.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((resolve) => setTimeout(resolve, 35));
        }
        window.scrollTo({ top: 0, behavior: "instant" });
      });
      await expect
        .poll(() =>
          page.evaluate(() =>
            Array.from(document.images)
              .filter((img) => !img.closest("dialog:not([open])"))
              .every((img) => img.complete && img.naturalWidth > 0),
          ),
        )
        .toBe(true);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        route,
      ).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}

test("menu móvel permite trocar de ambiente e respeita movimento reduzido", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/industry");
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await page
    .getByRole("link", { name: "VIRTEON Industry — mudar para EDU" })
    .click();
  await expect(page).toHaveURL("/edu");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
});
