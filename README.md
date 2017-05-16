# 图片存储demo

----------

### 图片上传请求由node实现（express的multer中间件）
#### config配置

    imgs: {
    	"imgs_dir": 'F:/upload/images', // 图片存放地址
    	"imgs_url":"http://localhost/images" // 返回图片地址
    },
    mongodb_url: 'mongodb://localhost/md5' // 数据库地址

### 图片访问请求由nginx实现（demo配的win系统的nginx）
#### nginx配置（server部分）
    server {
    	listen   80;
    	server_name  localhost;   
    
    	#上传操作由node服务器处理
    	location / {
    		proxy_passhttp://localhost;
    		indexindex.html;
    	}
    
    	#映射图片访问url
    	location /images/ {
			#缓存时间
    		expires 30d; 
    		rootF:/upload;
    	}
    
    	error_page   500 502 503 504  /50x.html;
    	location = /50x.html {
    		root   html;
    	}
    }

### 图片上传去重由mongodb+md5实现（md5命名实现图片文件唯一）
*注：可使用sha1算法，实现文件唯一，算法已引入demo，可选择使用*
#### 实现方法
1. 上传图片校验图片md5值，并在数据库中查询是否存在已有md5信息
2. 若没有md5信息，则以md5值重命名文件，保存文件，并保存md5信息到数据库，返回访问地址
3. 若存在md5信息，则将新上传文件删除，并返回已有md5信息的访问地址

### License
#### MIT
