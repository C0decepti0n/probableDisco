Global:
- Always use single quotes (') when writing strings, unless said string is used with a JSON file, in which case you would use double quotes (").
- Excluding jsx files, you should usually use 'require' instead of import when importing from another file or dependency.



Jsx Files and React Components (Client Side):
- Use only functional components (no class components).
- Utilize hooks (such as useState and useEffect) to make up for the inability to use the methods of a class component.
- Use import instead of 'require' to utilize data and tools/methods from dependencies and files. If importing a file or dependency causes errors while using 'require' doesn't (axios for example), you may instead use 'require'.



Databases (Mongodb/Mongoose):
- Separate database models into their own file, with each model being imported into the index.js file associated with the database so that they may be loaded when the database's index.js file is loaded.



Express:
- Separate request handlers for each database by routers, with each router being associated with their own url path and their own request handlers stored within a different file.