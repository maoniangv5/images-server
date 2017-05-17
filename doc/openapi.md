# 图片上传openapi  

### 1.1 `POST` openapi/fileupload/img ###
1.  简介

    上传图片openapi

2.  参数

    ```
    无
    ```

3.  返回结果    

    -   格式

    ```
    {
      code: <返回结果>,
      msg: <返回信息>,
      result: <返回信息>
    }
    ```

    -   实例

    ```
    {
      code: 1,
      msg: "success",
      result: { 
        originalname: 'paste.png', // 源图片文件名
        path: 'F:/upload/images/fb35da904062a8201e933140b7ad8ac7.png', // 上传后绝对地址
        url: 'http://localhost/images/fb35da904062a8201e933140b7ad8ac7.png'  // 访问地址
      }
    }
    ```
