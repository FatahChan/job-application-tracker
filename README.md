# Job Application Tracker

A Chrome extension that opens up a side panel to help you track your job applications

## Getting Started

Install the extension from manually on Chrome using dev mode

The extension build can be found [here](https://github.com/FatahChan/Job-Application-Tracker/releases)

### Dev environment

clone the repo

install dependency

```bash
pnpm install
```

Create a appwrite account

login to cli

```bash
pnpm appwrite login
```

create a project, I recommend naming the project "Job Application Tracker"

```bash
pnpm appwrite init project
```

create a database

```bash
pnpm appwrite databases --name 'Job Application Tracker' --databaseId 'unique()'
```

create a collection, use the databaseId from the previous command

```bash
pnpm appwrite databases createCollection --databaseId '{databaseId}' --name 'Applications' --collectionId 'unique()' --permissions 'create("users")' --documentSecurity true
```

pull the database

```bash
pnpm appwrite init collection
```

add the attribute in `appwrite.json`

```json
{
  "collections": [
    {
      ...,
      "attributes": [
        {
          "key": "notes",
          "type": "string",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "size": 2048,
          "default": null
        },
        {
          "key": "posting",
          "type": "string",
          "status": "available",
          "error": "",
          "required": true,
          "array": false,
          "format": "url",
          "default": null
        },
        {
          "key": "rejectionDate",
          "type": "datetime",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "format": "",
          "default": null
        },
        {
          "key": "offerDate",
          "type": "datetime",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "format": "",
          "default": null
        },
        {
          "key": "salary",
          "type": "integer",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "min": 0,
          "max": 1000000,
          "default": null
        },
        {
          "key": "acceptanceDate",
          "type": "datetime",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "format": "",
          "default": null
        },
        {
          "key": "role",
          "type": "string",
          "status": "available",
          "error": "",
          "required": true,
          "array": false,
          "size": 128,
          "default": null
        },
        {
          "key": "company",
          "type": "string",
          "status": "available",
          "error": "",
          "required": true,
          "array": false,
          "size": 128,
          "default": null
        },
        {
          "key": "applicationDate",
          "type": "datetime",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "format": "",
          "default": null
        },
        {
          "key": "interviewDate",
          "type": "datetime",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "format": "",
          "default": null
        },
        {
          "key": "status",
          "type": "string",
          "status": "available",
          "error": "",
          "required": false,
          "array": false,
          "elements": [
            "applied",
            "scheduledInterview",
            "interviewed",
            "offered",
            "rejected",
            "accepted"
          ],
          "format": "enum",
          "default": "applied"
        }
      ]
    }
  ]
}
```

deploy the collection

```bash
pnpm appwrite deploy collection
```

#### Install the extension

Enable developer mode on your browser extension page

Click on Load unpacked extension

Select the dist dir from the project
