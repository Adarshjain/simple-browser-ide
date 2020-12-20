# Simple browser based IDE

Simple browser based IDE poc leveraging JavaScript's new FileSystemAccess API.

##### Core stack
- FileSystemAccess API - [web.dev](https://web.dev/file-system-access/ "web.dev")  [wicg](https://wicg.github.io/file-system-access/ "wicg")  **NOTE:** This feature might break or change anytime
- [Vue 3]("https://v3.vuejs.org/" "Vue 3")
- [Monaco Editor]("https://microsoft.github.io/monaco-editor/")

### Run app
Step 1
```
npm run w
```
Step 2 : Run simple http server with public folder as root

### TODO
- [ ] Update Readme
- [x] List down directory and files
- [x] Integrate monaco editor
- [x] Write to file
- [ ] Context menu -> New, delete
- [ ] Clean UI
- [x] Tabs
- [ ] PWA
- [ ] Editing state
- [ ] Store local changes

### TODO long term
- [ ] Search files
- [ ] Simpler way of getting permissions from user
- [ ] Create new project/file
- [ ] Toolbar with options
- [ ] Explore more exciting features to add
- [ ] Persist IDE state
- [ ] Read only mode
