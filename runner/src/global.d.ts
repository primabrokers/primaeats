// Ambient declaration for screenshot-desktop, which ships no types.
declare module "screenshot-desktop" {
  interface ScreenshotOptions {
    /** Output format. We always use "png". */
    format?: "png" | "jpg";
    /** Optional display id when multiple monitors are present. */
    screen?: string | number;
    filename?: string;
  }
  /** Captures the primary display and resolves to an image Buffer. */
  function screenshot(options?: ScreenshotOptions): Promise<Buffer>;
  namespace screenshot {
    function listDisplays(): Promise<Array<{ id: string | number; name: string }>>;
  }
  export = screenshot;
}
