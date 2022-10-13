const articleSkeleton = (title: string, html: string) => `
<!DOCTYPE html>

<html lang="en">
    <head>
        <title>${title}</title>
${headSkeleton()}
    </head>

${style()}

    <body class="elc-cover">
${header()}

        <main >
            <hr class="unlimited" />

            <div class="elc-center">
                <div class="elc-stack">${html}</div>
            </div>

            <hr class="unlimited" />

        </main>

${footer()}
    </body>
</html>`;

const headSkeleton = () => `
    <meta charset="UTF-8" />
    <meta name="description" content="Read Silvan's blog" />
    <meta name="keywords" content="Silvan, Developer, Programmer, Computer Scientist" />
    <meta name="author" content="Silvan Codes" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="preload" href="https://elc.silvan.codes/elc.css" as="style" />
    <link rel="stylesheet" href="https://elc.silvan.codes/elc.css" />

    
    <link rel="preload" href="https://silvan.codes/assets/styles/global.css" as="style" />
    <link rel="stylesheet" href="https://silvan.codes/assets/styles/global.css" />

    <link
        rel="preload"
        href="https://silvan.codes/assets/fonts/ParadroidMono-Light.ttf"
        as="font"
        type="font/ttf"
    />
    <link
        rel="preload"
        href="https://silvan.codes/assets/fonts/Solid-Mono.ttf"
        as="font"
        type="font/ttf"
    />

    <!-- favicon START -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />
    <!-- favicon END -->

    <link href="https://unpkg.com/mono-icons@1.3.1/iconfont/icons.css" rel="stylesheet">
`;

const header = () => `
    <header>
        <div class="elc-center">
            <a href="/index.html">
                <h1>SilvanBlogs</h1>
            </a>
        </div>
    </header>
`;

const footer = () => `
    <footer class="elc-center">
    </footer>
`;

const style = () => `
<style>
    :root {
        --ratio: 1.98;
    }

    .elc-cover {
        --cover-min-block-size: auto;
        --cover-padding: var(--s1);
    }

    .elc-cluster {
        --cluster-justify-content: space-between
    }

    html,
    body,
    main {
        block-size: 100%;
    }

    h1 {
        font-size: var(--s1);
    }

    i {
        font-size: var(--s1);
    }

    .unlimited {
        max-inline-size: none;
    }

    header a {
        color: inherit;
        text-decoration: none;
    }

    section {
        padding: var(--s0);
    }
</style>
`;

export { articleSkeleton };
