import { newE2EPage } from "@stencil/core/testing";

describe("bar-code", () => {
  const textElement = async page => {
    const barcode = await page.find("bar-code");
    return barcode.shadowRoot.querySelector("svg");
  };

  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<bar-code></bar-code>");
    const element = await page.find("bar-code");
    expect(element).toHaveClass("hydrated");
  });

  it("renders changes to the text data", async () => {
    const page = await newE2EPage();

    await page.setContent('<bar-code text="Hola"></bar-code>');
    const component = await page.find("bar-code");
    expect((await textElement(page)).textContent).toEqual("Hola");

    component.setProperty("text", "Something else");
    await page.waitForChanges();
    expect((await textElement(page)).textContent).toEqual("Something else");
  });
});
