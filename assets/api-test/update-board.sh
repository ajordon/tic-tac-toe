EMAIL="aaron@me.com"
TOKEN="037a9d90e3c5a927ca62e41f2e97dc54"
USER_ID="59"
GAME_ID="1913"
BOARD="["x","x","x","o","","o","","",""]"

BASE_URL="http://tic-tac-toe.wdibos.com"
URL="${BASE_URL}/games/${USER_ID}"

json() {

  CONTENT_TYPE="application/json"

    curl ${URL} \
      --include \
      --request 'PATCH' \
      --header "Authorization: Token token=${TOKEN}" \
      --data "{
        \"game\": {
          \"id\": \"${GAME_ID}\",
          \"cells\": \"${BOARD}\",
          \"over\": \"true\",
          \"player_x\": {
            \"id\": \"${USER_ID}\",
            \"email\": \"${EMAIL}\"
            },
          \"player_o\": \"null\"
        }
      }"

}

json

echo
