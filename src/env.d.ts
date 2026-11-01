interface ImportMetaEnv {
  /** Base URL of the R2 bucket that serves photos, e.g. https://img.example.com/poc */
  readonly PUBLIC_IMAGE_BASE?: string;
  /** Comma-separated image keys already uploaded (hero,park1,park2,park3,rail,community,logo) */
  readonly PUBLIC_IMAGES_READY?: string;
}
