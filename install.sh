. /etc/profile

echo "sass_binary_site=https://npm.taobao.org/mirrors/node-sass/" > ~/.npmrc
echo "phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/" >> ~/.npmrc
echo "electron_mirror=https://npm.taobao.org/mirrors/electron/" >> ~/.npmrc
echo "registry=https://registry.npm.taobao.org" >> ~/.npmrc
##npm config set registry https://registry.npm.taobao.org


npm install gulp -g
npm install bower -g
npm install --unsafe-perm node-sass
npm install --unsafe-perm gulp-sass
bower install --allow-root
npm install



