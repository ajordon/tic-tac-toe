EMAIL="aaron@me.com"
PASSWORD="password"
TOKEN="e250c3f45b4f87cd562e3576231b81c9"
ID="59"

BASE_URL="http://tic-tac-toe.wdibos.com"
URL="${BASE_URL}/games"

json() {

  CONTENT_TYPE="application/json"

    curl ${URL} \
      --include \
      --request 'POST' \
      --header "Authorization: Token token=${TOKEN}" \
      --data "{
        \"game\": {
          \"cells\": \"["","","","","","","","",""]\",
          \"over\": \"false\",
          \"player_x\": {
            \"id\": \"${ID}\",
            \"email\": \"${EMAIL}\"
            },
          \"player_o\": \"null\"
        }
      }"

}

json

echo
