# 快速开始

Ruler Project提供了Spring Boot开发场景下的Starter启动器，可直接使用ruler-spring-boot-starter依赖来进行开发。

## 引入依赖

```xml:line-numbers {1}
<dependency>
    <groupId>info.lostred.ruler</groupId>
    <artifactId>ruler-spring-boot-starter</artifactId>
    <version>{ruler.version}</version>
</dependency>
```

## 配置application.yaml

框架默认只会根据application.yaml配置单实例规则引擎，项目中需要使用到多类规则引擎时，需要自己配置规则引擎bean。

```yaml:line-numbers {1}
ruler:
  #业务类型
  business-type: person
  #规则引擎类型，默认为complete
  engine-type: complete
  #规则类包扫描路径，与注解@RuleScan定义的路径会取并集并一起扫描
  rule-default-scope: info.lostred.ruler.test.rule
  #领域模型类包扫描路径，与注解@DomainScan定义的路径会取并集并一起扫描
  domain-default-scope: info.lostred.ruler.test.domain
```

## 编写配置类 <Badge type="info">可选</Badge>

使用注解初始化方式必须配置Configuration，单实例规则引擎不能满足项目时，可自定义规则引擎。

```java:line-numbers {1}
@Configuration
@RuleScan("info.lostred.ruler.test.rule")
@DomainScan("info.lostred.ruler.test.domain")
public class RulerConfig {
    //注册全局函数，spEl表达式可以使用#methodName调用全局函数
    @Bean
    public List<Method> globalFunctions() {
        return Arrays.asList(DateTimeUtils.class.getMethods());
    }
}
```

以上，info.lostred.ruler.test.domain为需要校验类的包名路径，下面是需要校验类的示例代码。

```java:line-numbers {1}
@Data
public class Person {
    private String certNo;
    private String name;
    private String gender;
    private Integer age;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date birthday;
    private Area area;
    private List<Contact> contacts;
}

@Data
public class Area {
    private String continent;
    private String country;
    private String province;
    private String city;
    private String district;
    private String town;
}

@Data
public class Contact {
    private String type;
    private String account;
    private String password;
    private Area area;
}
```

## 规则引擎依赖注入

以下是单元测试案例。

```java:line-numbers {1}
@SpringBootTest
class RulesEngineTest {
    static String businessType = "person";
    static Person person;
    @Autowired
    RulesEngineFactory rulesEngineFactory;
    @Autowired
    ObjectMapper objectMapper;

    String toJson(Object object) throws JsonProcessingException {
        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
    }

    void printResult(Object result, long startTime, long endTime) throws JsonProcessingException {
        System.out.println(toJson(result));
        System.out.println("执行时间: " + (endTime - startTime) + " ms");
    }

    @BeforeAll
    static void init() throws ParseException {
        person = new Person();
        person.setCertNo("12312");
        person.setGender("男");
        person.setAge(10);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date parse = simpleDateFormat.parse("2019-01-01");
        person.setBirthday(parse);
        Area area = new Area();
        person.setArea(area);
        Contact contact1 = new Contact();
        contact1.setArea(area);
        contact1.setType("sdf");
        contact1.setPassword("1234");
        Contact contact2 = new Contact();
        contact2.setPassword("1234");
        person.setContacts(Arrays.asList(contact1, contact2));
    }

    @Test
    void executeTest() throws JsonProcessingException {
        RulesEngine rulesEngine = rulesEngineFactory.getEngine(businessType);
        long s = System.currentTimeMillis();
        EvaluationContext context = rulesEngine.createEvaluationContext(person);
        rulesEngine.execute(context);
        long e = System.currentTimeMillis();
        Result result = rulesEngine.getResult(context);
        printResult(result, s, e);
    }
}
```

这里注入的是RulesEngineFactory接口，使用该接口的getEngine()方法获取业务类型对应的规则引擎接口。当然也可以直接注入自己配置规则引擎的实现类。

