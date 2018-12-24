## 1. set up efk stack on docker

Following the steps from `https://github.com/alextanhongpin/docker-efk`

The instance of kibana, elasticsearch and fluentd should be up and running.

---

## 2. build your docker image of rest api

Enter your rest-api folder and run

```
docker build -t my-api:latest .
```

When you type `docker images`, you should see the image name `my-api:latest`.

---

## 3. update your environment variable

```
vi .env
```

---

## 4. run your rest-api

```
docker run --log-driver=fluentd --name my-api -p 3000:3000 --env-file .env -d my-api
```

When you run `docker ps`, you should see the container name `my-api`

---

## 5. view log on kibana

You can see the log from kibana server at `http://localhost:5601`

---