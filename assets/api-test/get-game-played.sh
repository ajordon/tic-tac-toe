TOKEN="4a4d89ed2e66d2525a272ecbafa87627"
GAME_ID=1913

BASE_URL="http://tic-tac-toe.wdibos.com"
URL="${BASE_URL}/games/${GAME_ID}"

json() {

  CONTENT_TYPE="application/json"

    curl ${URL} \
      --include \
      --request 'GET' \
      --header "Authorization: Token token=${TOKEN}"
}

json

echo
