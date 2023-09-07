#!/bin/bash

# Replace or add integrationID
DEFAULT_INTEGRATION_ID="null"
sed -i "s/{{integrationID}}/${integrationID:-DEFAULT_INTEGRATION_ID}/g" /usr/share/nginx/html/index.html

# Replace or add region
DEFAULT_REGION="null"
sed -i "s/{{region}}/${region:-DEFAULT_REGION}/g" /usr/share/nginx/html/index.html

# Replace or add serviceInstanceID
DEFAULT_SERVICE_INSTANCE_ID="null"
sed -i "s/{{serviceInstanceID}}/${serviceInstanceID:-DEFAULT_SERVICE_INSTANCE_ID}/g" /usr/share/nginx/html/index.html

# Start Nginx
exec "$@"