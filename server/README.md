# **Torrent Togheder Server & API**

### the API is meant to be used by the client (in this same repo) and as because of that it's very basic.
### For a more complete torrent search API use [**this package**](https://www.npmjs.com/package/torrent-search-api) (also used by this project)

#

## **Project setup:**

Install node modules:
```
yarn install
```
Compile typescript:
```
yarn run compile
```
Start server:
```
yarn run start
```
Build & start in watch mode:
```
yarn run watch
```
#
## **API endpoints:**

### **- List of Providers**
Endpoint:
```
https://SERVER_URL/api/providers
```
Response is an array of provider objects, defined as:
```ts
{
  name: string,
  categories: string[],
}
```

### **- Torrent search**
Endpoint:
```
https://SERVER_URL/api/torrents
```
with http parameters:
```ts
{
  title: string,
  size: string, // <- the # of results wanted
  provider: string,
  category: string,
}
```
Response is an array of torrent objects, defined as:
```ts
{
  provider: string,
  title: string,
  time: string,
  size: string,
  // ^ the size on the disk (ex: 3.5 GB), defined as
  // /[0-9](\.[0-9]*)* [KMGT]{0,1}B/g
  magnet: string,
}
```