# Save Patterns

Save patterns in use in production versions of Simple Start Page are outlined here.


### V 1.0 ( <= 1.2)

| Container |
|:---------:|
| *chrome.storage.sync* |

| Keys | Values | Description |
|:----:|:------:|:-----------:|
| l1link | http://github.com/ | URL for link 1 |
| ... | ... | URL for links n-12 |
| l1title | GitHub | Label for link 1 |
| ... | ... | Label for links n-12 |
| header1 | Development | Label for collection 1 |
| ... | ... | Label for collections n-3 |
| calConfig | a4189fakj... | Google Calendar ID |

### V 1.3 ( <= ?)

| Keys | Values | Description |
|:-:|:-:|:-:|
| calConfig | a4189fakj... | Google Calendar ID |
| savePatternVersion | 1.3 | Float representing save pattern version |
| collections | {...} | See 1.3 collections structure |

#### Collections Structure

Array as order is important.

A functional overview can be mocked up easily in pseudo-code:

```haskell
Collections = [Collection]
where Collection  =>  {'header' :: String, 'links' :: [Link]}
where Link        =>  {'title'  :: String, 'link'  :: String}
```

Or, in JavaScript:

```javascript
var collections = [
    {
        'header': 'Development',
        'links': [
            {
                'title': 'GitHub',
                'link': 'https://www.github.com/'
            },
            {
                'title': 'Stack Overflow',
                'link': 'https://www.stackoverflow.com/'
            },
            // ... numerous links allowed
        ]
    },
    // ... numerous collections allowed
];
```
