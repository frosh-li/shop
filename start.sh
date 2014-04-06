PORT=3000 nohup forever app.js 2>&1 | /usr/local/sbin/cronolog "./log/log_s000_%Y%m%d.log" 2>&1 &
