# Nhóm 17 - LevelDB Research 🔎
```Nguyễn Văn Huy - Phan Văn Minh - Ngô Văn Hào```
``` 18020651 - 18020916 - 18020459 ```
## How to test?

Download dataset from here & extract `ratings.csv` to `server/dataset` & rename to `out.csv`
http://files.grouplens.org/datasets/movielens/ml-20m.zip

or

Auto generate `out.csv`

```
node --max-old-space-size=4096 fake_data.js
```

```
cd client 
yarn
yarn start
```
```
cd server
yarn
yarn start
```

