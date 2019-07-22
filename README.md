# less-complete README
## quick start
1. 在项目根目录新建`csscpt.config.json`
2. 在`csscpt.config.json`写入如下内容：
``` json
{
    "folderList": ["/"],
    "fileList": ["/index.less"]
}
```
v
## API
<table>
<tr>
<th>key</th>
<th>default</th>
<th>type</th>
<th>desc</th>
</tr>
<tr>
<td>folderList</td>
<td></td>
<td>Array</td>
<td>需要解析的xxx.less文件所在目录(相对于项目根目录)</td>
</tr>
<tr>
<td>fileList</td>
<td>["/index.less"]</td>
<td>Array</td>
<td>需要解析的xxx.less文件(相对于项目根目录)</td>
</tr>
</table>

  


