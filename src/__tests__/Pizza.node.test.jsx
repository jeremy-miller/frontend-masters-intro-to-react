import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import Pizza from "../Pizza";

// "screen" is stateful between tests, but we don't want that, so cleanup between tests
afterEach(cleanup);

test("alt text renders on Pizza images", () => {
  const name = "My Favorite Pizza";
  const src = "https://picsum.photos/200";
  const screen = render(
    <Pizza name={name} description="Super cool pizza" image={src} />,
  );

  const img = screen.getByRole("img");
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});

test("default image if none is provided", () => {
  const name = "My Favorite Pizza";
  const screen = render(<Pizza name={name} description="Super cool pizza" />);

  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
});
