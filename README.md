# ORMUCO Test - Answers

## EXECUTION PRE-REQUISITES
The code has been written in Typescript using npm.

To run the solutions to all the questions given follow the steps below:
### 1. Setup
Ensure you have `Node.js` and `npm` installed on your machine.
If not, download and install them from [Node.js official site](https://nodejs.org/).

### 2. Install Dependencies
Navigate to the project directory and run the following command to install all the necessary dependencies:
```bash
npm install
```
### 3. Build the Project
```bash
npm run build
```

# Solutions to the Given Questions

## QUESTION A.  
Your goal for this question is to write a program that accepts two lines (x1,x2) and (x3,x4) on the x-axis and returns 
whether they overlap. 
As an example, (1,5) and (2,6) overlaps but not (1,5) and (6,8)

## SOLUTION A
- The solution to Question A has been coded in folder [src/questionA](./src/questionA).
- Within this directory, file [LineSegmentXAxis](./src/questionA/LineSegmentXAxis.ts) contains a `class LineSegmentXAxis`.
- The `class LineSegmentXAxis` models a line segment along the `X-axis` and is instantiated with two coordinates, `x1` and `x2`. 
- The primary functionality of this class is embodied in the `overlapsWith` method.  This method takes another `LineSegmentXAxis` object as a parameter and determines whether the two segments overlap 
based on their respective coordinates.

## INSTRUCTIONS FOR EXECUTING SOLUTION A

Run the following command in your terminal.
```bash
npm run questionASolution
```

- The above command will trigger the script located at [./src/questionA/solution.ts](./src/questionA/solution.ts), 
which conducts a comparison across 16 unique pairs of line segments to evaluate overlaps.


- Once executed, the script provides a straightforward output that confirms the overlap status between line segments. Here's a sample of what the output will look like:

```shell
Are line segments (1,5) and (2,6) overlapping? true
Are line segments (1,5) and (5,8) overlapping? true
Are line segments (2,6) and (5,10) overlapping? true
```


Note: There is another function called `cacheCheckOverlapsWith` which is used to demonstrate a `cache` created in a 
solution to `QuestionC` and more about it is written further below in this README.


## QUESTION B
The goal of this question is to write a software library that accepts 2 version string as input and
returns whether one is greater than, equal, or less than the other. As an example: “1.2” is
greater than “1.1”. Please provide all test cases you could think of.

## SOLUTION B
- The solution to Question B has been coded in folder [src/questionB](./src/questionB).
- Within this directory, file [compareVersions.ts](./src/questionB/compareVersions.ts) contains an exported function `compareVersions`.
- The function `compareVersions` takes two string arguments, `version1` and `version2`, and is designed to compare software versions.
- Appropriate validation has been put in place to ensure that the version strings provided adhere to the expected format before comparison.

## INSTRUCTIONS FOR EXECUTING SOLUTION B

Run the following command in your terminal.
```bash
npm run questionBSolution
```

- The above command will trigger the script located at [./src/questionB/solution.ts](./src/questionB/solution.ts),
  which conducts a comparison between 15 pairs of versions, determining the precedence of one version over another..

- The results are displayed in an easy-to-understand format, indicating which version is greater or if there's an error due to improper format. 
- Here's a preview of the expected output:

```shell
Comparing versions '1.2' and '1.1' with expected value of 1: Result -> 1 (i.e. 1.2 is greater than 1.1)
Comparing versions '1.0.0' and '1.0.1' with expected value of -1: Result -> -1 (i.e. 1.0.0 is less than 1.0.1) 
Error while comparing versions: '1.0.0-dne' and '1.0.0'. Error: Invalid format for version: 1.0.0-dne
Error while comparing versions: '1..0' and '1.0'. Error: Invalid format for version: 1..0
```


Note: There is another function called `compareVersionsWithCheckingCache` which is used to demonstrate a `cache` created in a
solution to `QuestionC` and more about it is written further below in this README.

## QUESTION C
At Ormuco, we want to optimize every bits of software we write. Your goal is to write a new
library that can be integrated to the Ormuco stack. Dealing with network issues everyday,
latency is our biggest problem. Thus, your challenge is to write a new Geo Distributed LRU (Least
Recently Used) cache with time expiration. This library will be used extensively by many of our
services so it needs to meet the following criteria:

1.  Simplicity. Integration needs to be dead simple. 
2. Resilient to network failures or crashes. 
3. Near real time replication of data across Geolocation. Writes need to be in real time. 
4. Data consistency across regions 
5. Locality of reference, data should almost always be available from the closest region 
6. Flexible Schema 
7. Cache can expire

## SOLUTION C 
- The solution to Question C is provided in directory [./GeoLRUCacheQuestionC](./GeoLRUCacheQuestionC).

- This directory houses a standalone Node.js project and is specially designed to implement an `Geo Distributed LRU (Least Recently Used) cache server`.

- Central to this solution is the `LRUCache.ts` file located at [./GeoLRUCacheQuestionC/src/LRUCache.ts](./GeoLRUCacheQuestionC/src/LRUCache.ts)
which details the construction of the `LRUCache` class.

- The constructor of this class is designed to take two specific arguments:
  - `maxSize`: The maximum number of items the cache can hold.
  - `defaultExpiration`: The default duration after which a cache entry expires.

- The cache is designed with a flexible schema in mind, demonstrated by the following type declaration:

- ```typescript
  type CacheValue<T> = {
      value: T;
      expiresAt: number;
  };
  ```

- Upon launching the cache server, it maintains a `singleton instance` of the `LRUCache` class, ensuring efficient management and retrieval of cached data throughout its operation.

### FURTHER BREAKDOWN OF [LRUCache](./GeoLRUCacheQuestionC/src/LRUCache.ts) CLASS

#### Instance Variables
- `cacheMap`: 
  - A `Map` object that holds the cache entries. 
  - Each entry maps a string key to a `CacheValue` object containing the value and expiration timestamp.
- `maxSize`: 
  - The maximum capacity of the cache. 
  - Once this size is exceeded, the least recently used items are discarded.
- `defaultExpiration`: 
  - The default time-to-live (TTL) for each cache entry in milliseconds. 
  - This value is used if no specific expiration is set for an item.

#### Constructor
- `constructor(maxSize: number, defaultExpiration: number = 100000)`: 
  - Initializes the cache with a maximum size and an optional default expiration time.

#### Methods
- `get(key: string)`: 
  - Retrieves the value associated with a key. It returns `null` if the key is not found or if the item has expired. 
  - If the item is found and not expired, it is refreshed to become the most recently used item.
  
- `set(key: string, value: V, expiration?: number)`: 
  - Adds a new item to the cache with an optional custom expiration time. 
  - If the cache has reached its `maxSize`, the least recently used item is removed.
  
- `delete(key: string)`: 
  - Removes the item associated with the given key from the cache.
  
- `has(key: string)`: 
  - Checks if the cache contains an item associated with the given key.

- `clear()`: 
  - Empties the cache, removing all items.

The `LRUCache` class provides an efficient way to store and retrieve data with a focus on using the latest information while managing memory usage by discarding the least accessed data.

## ENDPOINTS (REST API) EXPOSED BY THE CACHE SERVER

For this Cache to be accessed and used by different services, a couple of endpoints are exposed:

### POST `/get`
- Retrieves the value for a given key from the cache. 
- The request body must contain the `key` field. 
- If the `key` is found and not expired, the corresponding value is returned; otherwise, a `BadRequestError` is thrown.

### POST `/set`
- Sets a value for a given key in the cache. 
- The request body must include both `key` and `value` fields, with an optional `expiration` field to override the default expiration (ttl) time. 
- It returns a 200 status code on success. 
- **This endpoint also initiates a `synchronization process` across other cache servers in other regions 
unless the request originates from another cache server.**


### class CacheController

- This class defined in file [CacheController](./GeoLRUCacheQuestionC/src/controllers/CacheController.ts)
- The `CacheController` class serves as an interface for the LRU cache server. 
- This class contains the two endpoints mentioned above.
- `Contructor`: 
  - The constructor receives an instance of `LRUCache<any>` via dependency injection.
  - This `LRUCache` instance is used to interact with the cached data.
  - Within the scope of the cache server, the `LRUCache` instance provided to the `CacheController` acts as a singleton. This means that across the entire lifespan of the server's process, a single instance of `LRUCache` is created and used for all cache operations. This singleton pattern ensures that all interactions with the cache are centralized through one managing entity, promoting consistency and preventing the duplication of cache state.

## RUNNING THE CACHE SERVERS

### Step 1. Pre-requisites
Before you begin, ensure that your environment is set up with the necessary tools to run the CacheServer. This project is containerized using Docker for ease of use and consistency across different environments. Here's what you need installed on your machine:

- Docker: Confirm that the Docker Daemon is active and running.
- Command Line Tools: Ensure `docker` and `docker-compose` command-line interfaces are installed.
- Development Tools: Have `Node.js` and `npm` available to handle any Node-specific tasks that may arise.


### Step 2. Running multiple Geo Distributed Servers
- The LRUCache solution demonstrates its potential for geo-distribution by simulating servers across various geographical locations on a local setup.
- This allows for a practical demonstration of how the cache operates in different regions, all from your local machine. 
- In a production environment, these instances would be hosted in their respective physical regions to optimize for latency and availability. 

- In order to demonstrate this geo distribution capability of LRUCache created in this solution, I have created three services in 
[docker-compose](docker-compose.yml) file

  1. Navigate to the project's root directory.
  2. Open your terminal and execute the below commands to start Docker containers that represent cache servers in three distinct regions:
     - Start the US East region cache server:
       - ```shell
             docker-compose up -d ormuco-cache-us-east-1
         ```
     - Start the US West region cache server:
       - ```shell
             docker-compose up -d ormuco-cache-us-west-1
         ```
     - Start the EU West region cache server:
       - ```shell
             docker-compose up -d ormuco-cache-eu-west-1
         ```

- These commands spin up three separate containers, 
each functioning as an independent LRUCache server instance located in one of the following regions: 
`us-east-1`, `us-west-1`, and `eu-west-1`. 
- While this setup is a simulation within Docker, it mimics the real-world application where such cache servers are deployed across different cloud regions for robustness and speed.


## DEMO OF GEO-DISTRIBUTED CACHE SERVERS FUNCTIONALITY WITH `ormuco-api` SERVICE
- To effectively showcase the capabilities of the `Geo Distributed Caches` set up in the previous steps, 
a supplementary service named `ormuco-api` is defined in the [docker-compose](docker-compose.yml) file named `ormuco-api`.
- This service is essentially a Node.js server that offers two RESTful endpoints designed to interact with the cache servers.
- This microservice will expose a node js server with two REST endpoints
  - POST `/checkOverlap`: 
    - This endpoint integrates with the solution for Question A. 
    - It allows clients to determine if two line segments on the X-axis overlap by accepting a JSON request body with the following structure:
      - ```json
        {
          "lineSegment1": {"x1": number, "x2": number},
          "lineSegment2": {"x1": number, "x2": number}        
        } 
        ```
  - POST `/compare-versions`: 
    - This endpoint is aligned with the solution for Question B, providing version comparison functionality. 
    - It expects a JSON payload in the following format:
      - ```json
        {
          "version1": "string",
          "version2": "string"    
        } 
        ```
- Both the above endpoints utilize the `distributed cache services` to enhance performance and data retrieval efficiency.
- For the purpose of this local demonstration, the `ormuco-api` service simulates geographical distribution by assigning 
a random region code—`us-east-1`, `us-west-1`, or `eu-west-1`—to each request. 
- In a live production environment, the region code would typically be inferred from the user-agent or provided explicitly 
in the API call to simulate real-world, region-based processing.

### RUNNING `ormuco-api` SERVICE
- Once again, ensure you have the following tools:
  - Docker: Confirm that the Docker Daemon is active and running.
  - Command Line Tools: Ensure `docker` and `docker-compose` command-line interfaces are installed.
  - Development Tools: Have `Node.js` and `npm` available to handle any Node-specific tasks that may arise.
- Now, navigate to the project's root directory. Open your terminal and execute the below commands to start a Docker container
that represent the supplementary `ormuco-api` service:
    - ```shell
             docker-compose up -d ormuco-api
       ```
- Upon execution, this command will initiate the ormuco-api microservice, which is now accessible through localhost on port 8082. 
- This service acts as a gateway to the solutions provided for overlap checking and version comparison readily available for testing and demonstration purposes, 
while also showcasing the Geo-Distributed LRU Caches.