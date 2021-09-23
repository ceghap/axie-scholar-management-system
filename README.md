# ASG Leaderboard

Leaderboard: A SLP leaderboard & An MMR Leaderboard – This one is relatively simple; I already have the API endpoints

## Notes

- For the APIs – I already have everything; its pretty straightforward to consume.
- One thing to keep in mind is that Axie Infinity no longer track historical data ( win/rate data, etc... ) so for those each app will need to have its own DB. I like the way axie.watch does it with the "upload to cloud" button/feature.
- Login will be used just to keep track of the ronin address a user want to track

## API Endpoints

- Postman Library will be provided (KIV)

```
https://game-api.axie.technology/api/v1/0xRONIN_ADDRESS
https://game-api.axie.technology/slp/0xRONIN_ADDRESS
https://game-api.axie.technology/mmr/0xRONIN_ADDRESS

https://game-api.axie.technology/api/v1/ronin:RONIN_ADDRESS
https://game-api.axie.technology/slp/ronin:RONIN_ADDRESS
https://game-api.axie.technology/mmr/ronin:RONIN_ADDRESS

https://game-api.axie.technology/api/v1/ronin:RONIN_ADDRESS_1,0xRONIN_ADDRESS_2,ronin:RONIN_ADDRESS_3,0xRONIN_ADDRESS_4
https://game-api.axie.technology/slp/ronin:RONIN_ADDRESS_1,0xRONIN_ADDRESS_2,ronin:RONIN_ADDRESS_3,0xRONIN_ADDRESS_4
https://game-api.axie.technology/mmr/ronin:RONIN_ADDRESS_1,0xRONIN_ADDRESS_2,ronin:RONIN_ADDRESS_3,0xRONIN_ADDRESS_4
```

it does not matter if you use the ronin: or 0x on the address, they both return the same thing. If you want to do multiple addresses at once, just add a comma , after each one

### Tech stack

- Nextjs (https://nextjs.org/)
- SWR (https://swr.vercel.app/)
- Supabase (https://supabase.io/new) or Sqlite (currently on dev env)
- Prismajs (https://www.prisma.io/)
- Chakra UI (https://chakra-ui.com/)
