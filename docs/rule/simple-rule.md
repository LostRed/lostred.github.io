# 简单规则 SimpleRule

SimpleRule简单规则是ProgrammaticRule编程式规则的子类，其中evaluateInternal()方法重写为不支持方法。

SimpleRule简单规则：

```java:line-numbers
public abstract class SimpleRule<T> extends ProgrammaticRule<T> {
    @Override
    public final boolean evaluateInternal(T object) {
        throw new UnsupportedOperationException();
    }
}
```
