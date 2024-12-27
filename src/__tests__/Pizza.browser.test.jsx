import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import Pizza from "../Pizza";

test("alt text renders on image", async () => {
  const name = "My Favorite Pizza";
  const description = "Yummy pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} description={description} image={src} />,
  );

  const img = screen.getByRole("img");

  await expect.element(img).toBeInTheDocument();
  await expect.element(img).toHaveAttribute("src", src);
  await expect.element(img).toHaveAttribute("alt", name);
});
