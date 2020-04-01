# kapp-cli
Kademi CLI for KodeJS Application

## Install
```
npm install @kademi/kapp-cli -g
```

## Update latest version
```
npm update @kademi/kapp-cli -g
```

## Commands
### `version`
```
Usage: kapp version [options] <name>

Update application version

Options:
  -nv, --new-version <newVersion>  New version number
  -ud, --update-depended           Update version on depended apps
  -h, --help                       display help for command

```

### `sync`
```
Usage: kapp sync [options] [params...]

Sync your applications

Options:
  -h, --help  display help for command

```
**Note**: `kapp sync` has same options with `ksync3.jar`. Instead of `java -jar /path/to/ksync3.jar params...`, you just run `kapp sync params...`. Documentation for KSync3 is available at [here](https://docs.kademi.co/blogs/docs-kb/developing-with-ksync/).
