import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";

export default {
  useNextSeoProps() {
    return {
      titleTemplate: "%s – React State",
    };
  },
  logo: (
    <>
      <img src="/assets/Logo.svg" width={35} height={35} />
      <span style={{ marginLeft: ".4em", fontWeight: 800 }}>React State</span>
    </>
  ),
  project: {
    link: "https://github.com/open-tech-foundation/react-state",
  },
  docsRepositoryBase: "https://github.com/open-tech-foundation/react-state",
  editLink: { component: null },
  head: () => {
    const { asPath } = useRouter();
    const { frontMatter } = useConfig();
    const url = "https://react-app-state.pages.dev/" + asPath;

    return (
      <>
        <link rel="icon" href="/assets/Logo.svg" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || "React State"} />
        <meta
          property="og:description"
          content={
            frontMatter.description ||
            "An Extensive JavaScript Standard Library."
          }
        />
        <meta
          name="google-site-verification"
          content="1GsNBEYX2lcJpmj3OyKi6bszF9n3-Uv6bG_diPCpDhc"
        />
      </>
    );
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="https://open-tech-foundation.pages.dev/" target="_blank">
          Open Tech Foundation
        </a>
        .
      </span>
    ),
  },
};
