const articleSkeleton = (title: string, html: string) => {
  return `
<!DOCTYPE html>

<html lang="en">
    <head>
        <title>${title}</title>
        <meta charset="UTF-8" />
        <meta name="description" content="Read Silvan's blog" />
        <meta name="keywords" content="Silvan, Developer, Programmer, Computer Scientist" />
        <meta name="author" content="Silvan Codes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="preload" href="https://elc.silvan.codes/elc.css" as="style" />
        <link rel="stylesheet" href="https://elc.silvan.codes/elc.css" />

        
        <link rel="preload" href="/assets/styles/global.css" as="style" />
        <link rel="stylesheet" href="/assets/styles/global.css" />

        <link
            rel="preload"
            href="/assets/fonts/ParadroidMono-Light.ttf"
            as="font"
            type="font/ttf"
        />
        <link
            rel="preload"
            href="/assets/fonts/Solid-Mono.ttf"
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
    </head>

    <body>
        ${html}
    </body>
</html>
  `;
};

export { articleSkeleton };
