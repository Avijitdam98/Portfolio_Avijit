import { render } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  it("should render with fade in animation", () => {
    const { container } = render(<Footer />);
    const footerElement = container.querySelector(".footer");
    const computedStyle = window.getComputedStyle(footerElement);

    expect(footerElement).toBeInTheDocument();
    expect(computedStyle.animation).toContain("fadeIn");
    expect(computedStyle.animation).toContain("2s");
  });

  it("should apply footer class", () => {
    const { container } = render(<Footer />);
    const footerElement = container.querySelector(".footer");

    expect(footerElement).toHaveClass("footer");
  });

  it("should mount and unmount without errors", () => {
    const { unmount } = render(<Footer />);
    expect(() => unmount()).not.toThrow();
  });
});
