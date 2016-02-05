EMAIL="aaron@me.com"
PASSWORD="password"
PASSWORD_CONFORMATION="password"

BASE_URL="http://tic-tac-toe.wdibos.com"
URL="${BASE_URL}/sign-up"

json() {

  CONTENT_TYPE="application/json"

  curl ${URL} \
    --include \
    --request 'POST' \
    --header "Content-Type: ${CONTENT_TYPE}" \
    --data "{
      \"credentials\": {
        \"email\": \"${EMAIL}\",
        \"password\": \"${PASSWORD}\",
        \"password_conformation\": \"${PASSWORD_CONFORMATION}\"
      }
    }"

}

json

echo
