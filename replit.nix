{ pkgs }: {
    deps = [
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs-14_x

        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}