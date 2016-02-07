EMAIL="aaron@me.com"
TOKEN="a23cc4b7cf6723aad52ec87845a63aa1"
USER_ID="59"
GAME_ID="1914"
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
          \"cells\": \"${BOARD}\",
          \"over\": \"true\"
        }
      }"

}

json

echo
