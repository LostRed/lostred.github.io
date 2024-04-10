# SpEL基础语法

## 字面量表达式

SpEL支持的字面量包括：字符串、数字类型（int、long、float、double）、布尔类型、null类型。

## 算数运算表达式

| 含义 | 表达式 |
|----|-----|
| 加  | `+` |
| 减  | `-` |
| 乘  | `*` |
| 除  | `/` |
| 求余 | `%` |
| 幂  | `^` |

## 关系表达式

| 含义   | 表达式       |
|------|-----------|
| 等于   | `==`      |
| 不等于  | `!=`      |
| 大于   | `>`       |
| 大于等于 | `>=`      |
| 小于   | `<`       |
| 小于等于 | `<=`      |
| 区间   | `between` |

## 逻辑表达式

| 含义 | 表达式         |
|----|-------------|
| 且  | `and`或`&&`  |
| 或  | `or`或`\|\|` |
| 非  | `!`或`not`   |

## 字符串连接及截取表达式

使用`+`进行字符串连接，使用`'string'[index]`来截取一个字符，目前只支持截取一个。 如`'Hello ' + 'World!'`得到`Hello World!`
；而`'Hello World!'[0]`将返回`H`。

## 三目运算

三目运算符**表达式1?表达式2:表达式3**，用于构造三目运算表达式，如`2>1?true:false`将返回`true`。

## Elvis运算符

Elvis运算符**表达式1?:表达式2**
，从Groovy语言引入用于简化三目运算符的。当表达式1为非null时则返回表达式1，当表达式1为null时则返回表达式2，简化了三目运算符方式`表达式1?表达式2:表达式3`
，如`null?:false`将返回`false`，而`true?:false`将返回`true`。

## 正则表达式

使用`string matches regex`，如`'123' matches '\d{3}'`将返回true。

## 括号优先级表达式

使用`(表达式)`构造，括号里的具有高优先级。