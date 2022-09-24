const solutionsArchitecture = {
    moscow: {
        mustHaves: {},
        shouldHaves: {},
        couldHaves: {},
        wontHaves: {}
    },
    designPatterns: {
        nTierLayered: {
            keyPoints: 'loose coupling, clean code, clean arcitacture, bob martin, more sublayers = higher server & network config costs, less sublayer means tighter coupling',
            components: {
                webLayer: {},
                applicationLayer: {},
                dataLayer: {},
                subLayers: {
                    businessLayer: {},
                    applicationLayer: {},
                    databaseLayer: {}
                }
            }
        },
        multiTenantSaas: {
            keyPoints: 'share same infastructure but has custom presentation layer',
            components: {
                nTierLayered: {},
                tenants: 'customers that share infastructure',
                isolationLevels: {
                    databaseIsolation:'',
                    tableIsolation: '',
                    rowIsolation: ''
                }
            } 
        },
        statelessStateful: {
            stateless: 'store user session information in persistent database layer. session storage is main difference betwwwn stateful and stateless app designs; in stateful apps, session storage is done on server. stateless stores sessions in nosql db and stores session id in client cookie or session storage',
        },
        SOAServiceOrientedArchitecture: {
            restAPI:{}
        },
        microServices: {
            builtInFaultTolerance,
            boundContexts: 'blocks that encapsulate a business domain... exp: automobile section, books section, chat section... anything that can be uniquly grouped and encapsulated',
            bestPractices: {
                dataStore: 'array of db choices for business domains',
                statelessServer: 'persist session data on nosql db, NOT on server ',
                decoupledBuilds: 'deploying new features dont impact others',
                containerDeployment: '',
                serverless: 'incorporate as many aspects of serverless as possible. Lamdas?',
                aBDeployment: 'deploying features with incrementally to small parts of user base'
            }
        },
        queueBased:[ 
            'Queue -->  Producers: message senders --- Consumers: message recievers',
            {retryLogic: {
                queuingChainPattern: 'sequential processing needs to be ran on multiple linked systems. the queue holds messages that stay in queue until its picked up and process is confirmed',
                jobObserverPattern: 'servers added and removed by watching messages and responding to threshholds alerts'
            }},
            {eventDriven: {
                events: 'queue based lets consumers pull, event based pushes messages between compnents to trigger events',
                pubSub: 'when an event is published, a notification is sent to all subscribers of that event',
                eventStream: 'consumer reads from continuous flow of events; exp: clicklogs, video streaming, ect',
                fanOut: 'push once in SNS, recieve all in SQS that are subscribers --> fully decoupled'
            }},
        ],      
        cacheBased: {
            types: {
                clientSide: 'cache-control header, in broswer. done for client requests and server responses: where the content should be cached and how long(ttl). cookies',
                dns: 'to local server or browser',
                web: 'cdn: edge locations',
                application: 'complex or repeated business logic',
                database: 'in-memory in front of sql/nosql'
            },
            engines: {
                redis,
                memcached
            },
            patterns: {
                renameDistribution: 'setup a ttl for cache data. server will pick from cache data until ttl expires',
                cacheProxy: 'cache engine sits in front of web app',
                rewriteProxy: 'ability to change content delivery destination',
                app: ''

            }
        },
        circutBreaker: {
            healthChecks:''
        },
        floatingIp: {
            mmisc:''
        },
        SQS: [
                'decouples applications',
                'can access from vpc using vpc endpoints (without public ips and having to using public net)',
                'can access from gateway if youre okwith being public over the internet',
                'low latency with 256kb per message',
                'uses IAM  polocies to access SQS API',
                'also uses SQS Access Policies --> useful for cross account access and allowing other services to write to an SQS',
                'Producing: ',
                    'uses the SDK',
                    'persisted into the queue until a consumer deletes it',
                    'default in queue persistence is 4 days, can go up to 14 days',
                    'unlimited throughput',
                'Consuming:' ,
                    'run on ec2 instances or as Lambdas',
                    'Polls SQS for messages',
                    'can recieve up to 10 messages at a time',
                    'processages messages --> exp: insert into RDBS then delete',
                    'recieve and process messages in parallel',
                    'consumers delete messages after processing them',
                    'at least once delivery and best effort messaging',
                    'can be auto-scaled',
                'Encryption:',
                    'in-flight using https api',
                    'at-rest using KMS',
                    'client side encryption option',
                'Message Visibility Timeout:',
                    '1. message is sent to queue by producer',
                    '2. queue is polled by consumer',
                    '3. message becomes invisible to other consumers',
                    '4. if message isnt consumed and deleted by conmer with 30 seconds, it becomes visible again',
                    '5. if more than 30 sconds is needed to process messages, use ChangeMessageVisibility API to program more time',
                    '6. must find a ideal timeout duration. too high = x amount of time before reprocessing attempt can be made. too low = probably geting duplicates',
                'Long Polling: ',
                    'if consumers request message from the queue and its empty, it can wait for messages to arrive',
                    'decreses number of api calls',
                    'wait time between 1 and 20 seconds',
                    'can be enabled at the queue level or the API level',
                'FIFO: ',
                    'limited 300msgs/second throughput because of guarenteed ordering',
                    'can bump up to 3000msgs with batch processing',
                    'when naming, must use .fifo extension on name',
                    'https://getyarn.io/yarn-clip/3262e376-cb60-41a7-9e0f-e6022864d177',
                    'https://getyarn.io/yarn-clip/3f2659f7-220d-443d-aafd-3826af7424c2',
                'ASG: ',
                    'can create a system that scales out based on the amount of messages in the queue',
                    'if database loads are too big, some transactions may be lost',
                        'this can be solved by using SQS as a buffer to database writes',
                            'request --> enqueue --> the queue --> dequeue --> insert into db',
        ],
        SNS: [
                'aka pub/sub.... sending one message to many recievers',
                'publishers create topics',
                'subscribers subscribe to topics',
                'up to 12.5 million subscriptions per topic',
                '100k topics limit but can increase',
                'uses SDK',
                'create topic',
                'create subscription',
                'publish topic',
                'for Mobile: --> create platform app, create endpoint, publish to platform endpoint',
                'same security as SQS',
                'Filtering Policy: ',
                    'for filtering incoming messages based on whatever you business logic you need',
        ],
        Kinesis: [
            'Data Streams',
                'can continuously capture gigabytes of data per second from hundreds of thousands of sources such as website clickstreams, database event streams, ect',
                'massively scalable and durable real-time data streaming service',
                'is NOT managed, manual scaling, data storage',
                'user is expected to manually provision an appropriate number of shards to process the expected volume of the incoming data stream',
                'consists of n amount of shards',
                'gets data from producers --> apps, clients, sdk/kpl, kinesis agent',
                'producers produce records and put them into Kinesis stream',
                'records are made up of partition keys and data blobs',
                'streamed at 1/mb per second or 1k msg per second per shard',
                'consumers recieve records that consist of partition keys, sequence numbers and data blobs',
                'consumbers stream at 2mb per second per shard shared or same but enhanced,',
                'retintion 1 to 365 days',
                'ability to reprocesses / replay data',
                'data is immutable',
                'data that shares same partition key goes into same shard(key based ordering)',
                'producers use sdk, kpl, kinesis agent',
                'consumers use kcl, sdk, lambdas, firehose, ect',
                'ingests data at scale, write custom code, realtime',
                'Capacity Modes',
                    'Provisioned Mode: selects number of shards scaling manually or using an api', 
                        '1mb in per second or 1k records per second',
                        'Enhanced Fanout',
                            '2mb out per second, classic or enhanced fanout',
                            'uses sharding to speed up',
                            'enhanced fan-out developers can register stream consumers to use enhanced fan-out and receive their own 2MB/second pipe of read throughput per shard, and this throughput automatically scales with the number of shards in a stream',
                        'pay per shard provisioned per hour',
                    'OnDemand Mode',
                        'capacity is provisioned and managed by AWS',
                        'default capacity provisioned 4mbs or 4k records per second',
                        'scales automatically based on past 30 days throughput',
                        'pay per steram',
            'Firehose',
                ' easiest way to reliably load streaming data into data lakes, data stores, and analytics tools',
                'IS managed, auto-scaled, no data storage',
                'iot, streams and cloudwatch can record into firehose',
                'destinations are s3, redshift, elastisearch, http endpoints,or 3rd party',
                'fully manages and auto scales',
                'near real time, 60 secods latency min or 1mb data',
                'failed goes to backup s3 bucket',
                        '',
                    'Analytics',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    'Ordering',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '', 
        ],   
        MQ: [
            'managed apache Active  MQ',
            'used for migration from on prem to cloud without rearchitecturing it as long as it used protocols like MQTT, AMQP, STOMP, Openwire, WSS',
            'has SQS and SNS features'
        ]   
    },
    stakeHolders: {
        title: '',
        catagory: '',
        functionality: [],
        importance: {
            howImportantIsThis: 0,
            whyIsThisImportant: ''
        },
    },
    functionalRequirements:{
        notes: [`actual business requirements like chatting, upload videos, browse inventory, payment system`],
        title: '',
        catagory: '',
        functionality: [],
        importance: {
            howImportantIsThis: 0,
            whyIsThisImportant: ''
        }
    },
    nonFunctionalRequirements:{
        notes: [`Invisible to users & customers but without them, uper experience will be negativly impacted`],
        nfrConsiderationCatagories: {
            data: [
                {dataTypes: {
                    transactionalStructured: {
                        exp: 'orders, guesses',
                        storage: 'sql'
                    },
                    keyValue: {
                        exp: 'session-data, logs, comments',
                        storage: 'nosql'
                    },
                    analytics: {
                        exp: 'logs',
                        storage: 'data warehouse'
                    },
                    object: {
                        exp: 'img, video',
                        storage: 'file based: s3'
                    },
                    web: {
                        exp: 'static content',
                        storage: 'cdn'
                    }
                }},   
                {dataTemperature: {
                    hotData:[ 
                        'frequently accessed data that requires sub millisecond latency and should be cached',
                        'stock trading, recomendation services, ect'
                    ],
                    warmData:[ 
                        'semi-frequently accessed data that requires latency of seconds to munites and should be stored in rdb or data warehouse',
                        'performance reports, statemets, ect'
                    ],
                    coldData:[ 
                        'non-frequently accessed data that can tolerate latency of hours and should be stored in archive storage system',
                        'records, raw data, ect'
                    ],
                }},                 
                {dataModeling: {
                    entityRelationshipDiagram: '',
                    singleTableDesign: {
                        table: 'whole table',
                        items: 'items equate to rows in a table',
                        attributes: 'items are created with attributes',
                        partitionKey: 'mandataory value that uniquely ids an item same as mongodb _id',
                        sorkKey: 'optional grouping id, for multiple sort keys you have to make a local secondary index, sort keys get turned to indexes the opened up for querying',
                    }
                }},
                {dataAccess: {
                    accessMethods: 'block, file or obj',
                    accessPatterns: 'list of ways database will be acessed... exp: get user by email or create game with userid,    sequential or random or read-only, rom vs sam vs ram, ',
                    accessFrequency:'hot: online, warm: offline, cold: archived',
                    updateFrequency: 'write once, read many or dynamic',
                    accessAvailability: 'availability when required',
                    accessDurability: 'reliability of data store to minimize any data loss',
                    accessThroughput: 'iops & r/w ps in MBs',
                    raidConfiguration: 'spreadng data across multiple disks and presenting as 1 logical drive',
                }},
                {dataStorage : { 
                    useCases: [
                        'EBS --> when you need a high-performance storage service for a single instance',
                        'EFS -->  whenever you need a shared file storage option for multiple EC2 instances with automatic, high-performance scaling. ',
                    ],
                    EFS: {
                            notes: [
                                'attached to hardware',
                                'automanaged "network file system"',
                                'single efs can be used on multipe ec2 instances',
                                'autoscales automatically, no capacity planning necessary',
                                'can handles 1000s of concurrent clients, 10gb per second throughput',
                                'can scale to PB size automatically',
                                'must attach a security group',
                                'Types:',
                                    'Performance Mode',
                                        'General Purpose: latency sensitive, (webs servers, cms, ect)',
                                        'Max I/O: high latency, throughput & parallelism (big data, media processing, ect)',
                                    'Throughput Mode',
                                        'Bursting: 1TB = 50mb/s, burst up to 100mb',
                                        'Provisioned: Manually set throughput',
                                'Storage Classes:',
                                    'Storage Tiers: Lifecycle management feature, moved to IA after x days',
                                        'Standard: frequently accessed files',
                                        'IA(Infrequently Accessed EFS): low file retrival price, use lifecycle policy',
                                    'Availability & Durability:',
                                        'Standard: multiple AZs, production enviornment',
                                        'OneZone: single AZ, development enviornment ==> (EFS OneZone IA, 90% discount),'
                            ],
                            useCases: 'attached to ec2 instances',
                    },
                    InstanceStore: [
                            'Better performing alternative to EBS',
                            'Storage is lost if stopped',
                            'Good for buffers, caches, temporary content',
                            'High I/O'
                    ],
                    EBS: [
                            'Elastic Block Storage = Network attached', 
                            'for data persistece', 
                            '1 instance & 1 AZ at a time but snapshots can be across AZ',
                            'Analogy ==> USB for network',
                            'good for failover because its not physical and can be moved',
                            'Delete On Termination:', 
                                'controls EBS behavior when an ec2 instance is deleted',
                                'Roots volume is deleted when ec2 terminates',
                                'useCases: preserve root volume when instance is terminated ',
                            'Snapshots',
                                'backups, can be in multiple AZ',
                                'can be stored in archive tier, 75% cheaper but takes 24 to 72 hrs to restore',
                                'can alternativly use a recycle bin with a 1 day to 1 year retention',
                            {Encryption: [
                                'all data is encrypted at all times, at rest, transit and snapshots and handles for you',
                                'uses kms keys for encryption ',
                                'encrypt an unencrypted ebs volume by:', 
                                    '1. create snapshot',
                                    '2. encrypt snapshot using copy',
                                    '3. create new ebs volume from snapshot',
                                    '4. attach encrypted volume to instance'
                            ]},
                            {Volumes: {
                                SSD: {
                                    notes: 'CAN be used for boot volume',
                                    gp2and3: [
                                        'SSD, general purpose, cost effective storage, low-latency',
                                        'System boots, dev/test enviornments, virtual desktops',
                                        '1GB to 16GB',
                                        'gp2: can burst to 3k iops w/ throughput of 125mib per second, 3iops per GB of storage up to 16000 iops, they are dependent and linked',
                                        'gp3: 3000 iops w/ a throughput od 125mib per second, can increase 16kiops, 1000mb per second independently'
                                    ], 
                                    io1and2: {
                                        notes: 'SSD, FOR LOW LATENCY OR HIGH THROUGHPUT',
                                        PIOPS: [
                                            'Provisioned IOPS:', 
                                            'For business critical applications that need sustained IOPS performance', 
                                            'For apps that need more than 16000 IOPS',
                                            'For DB intensive workloads or ',
                                            'For high consistency and storage performance',
                                            'io1/io2: 4GB to 16TB, maxPIOPS= 64000 for Nitro EC2 instances, 32000 for others EC2 instances, can increase PIOPS independently',
                                            'io1/io2 are same price but io2 has more durability and iops per GB',
                                            'io2BlockExpress: 4GB to 64TB, sub-millisecond latency, maxPIOPS = 256K, 1000IOPS per GB',
                                        ],
                                        multiAttach: [
                                            'Amazon EBS Multi-Attach enables you to attach a single Provisioned IOPS SSD (io1 or io2) volume to multiple instances that are in the same Availability Zone.'
                                        ],
                                    }, 
                                },
                                HDD: {           
                                    notes: 'CAN NOT be used as boot volume',                 
                                    st1: [
                                        'HHD, FOR FREQUENTLY ACCESSED THROUGHPUT INTENSIVE WORKLOADS',
                                        'For THROUGHPUT OPTIMIZATION, big data, log processing',
                                        'maxThroughput = 500mbs, maxIOPS = 500 '
                                    ], 
                                    scl: [
                                        'COLD HHD, FOR INFREQUENTLY ACCESSED DATA',
                                        'maxThroughput = 250mbs, maxIOPS = 250'
                                    ],
                                }
                            }},
                    ],
                    S3: [
                        ' S3 server access logging provides detailed records for the requests that are made to a bucket.',
                        'Buckets',
                            'can be looked at as directroies',
                            'stores objects in buckets',
                            'names must be globally unique',
                            'buckets are defined at the region level',
                            'naming convention: no uppercase, underscores, ips. mus be 3-63 vhars long, start with lowercase/number',
                        'Objects',
                            'objects can be looked at as files',
                            'objects have keys, keys are the full path of an object',
                            'key is composed of the prefix and the object name',
                            'max size is 5tb',
                            'if uploading more than 5gb at a time, must use multipart upload',
                            'metadata: list of key value pairs',
                            'tags: unicode key-value pair',
                            'version id: optional',
                        'Versions',
                            'enabled at the bucket level',
                            'protects aginst unintended deletes',
                            'easy rollback to previous versions',
                        'MFA Delete',
                            'forces users to use a code on a device for permissions and access',
                            'versionsing must be enabled',
                            'can only be enabled or disabled by root acct',
                        'AccessLogs',
                            'log into sepertae bucket for analyzing using AWS Athena',
                            'do NOT set logging bucket to monitored bucket. each time something is put in, it will log and that log will log itself and so on',
                        'Replication',
                            'Must enable versioning in source and destination',
                            'Buckets can be in different accounts',
                            'Must give proper IAM permissions',
                            'can replicate objects using Batch Replication',
                            'CRR(Cross Region Replication)',
                                'compliance, low latency access',
                            'SRR(Same Region Replication)',
                                'log aggregation, live replication betwween production and test accts',
                        'PreSigned URLS',
                            'use sdk or cli',
                            'valid for 3600 seconds can change with "--expires-in" ',
                            'they inherit permissions of the person that geerated the url',
                            'dynamically creating urls',
                        'StorageClasses',
                            'General Purpose',
                                'low latency, high throughput',
                                'mobile and gaming apps',
                                '99.99 availabilty',
                            'Standard Infrequent Access',
                                'less accessed but retrieved fast when needed',
                                'disaster recovery, backups',
                            'OneZone Infrequent Access',
                                'high durability',
                                '99.5 availability',
                                'secondary copies of on prem data or data you can recreate',
                            'Glacier',
                                'low cost for archiving and backups',
                                'priced by storage and retriveal',
                                'Glacier Instant Retrieval',
                                    'Millissecond retrival, 90day min storage',
                                'Glacier Flexible Retrival',
                                    'retrival options ---> expedited: 1 to 5 minds, standard: 3 to 5 hrs, bulk: 5 to 12 hrs',
                                    '90 day min storage',
                                'Glacier Deep Archive',
                                    'retrival options --->  standard:12hrs, bulk:48hrs',
                                    '180 days miniumm',
                            'Intelligent Tiering',
                                'fee for auto tiering between classes based on usage patterns with NO retrival charges',
                        'LifeCycle Rules',
                            'define transaction objects, expiration actions, delete incomplete multi part uploads',
                            'rules can be created for certain bucket prefixes or object tags',
                        'Analytics',
                        'Performance',
                            'Multipart Upload recomended for files more than 100mbs, must for more thean 5gb',
                            'S3 Transfer Acceleration: increase transfer speed by transfering data to edge location',
                            'autoscales to high request rates',
                            '3500 put/copy/post/delete requests per second',
                            '5500 get/head reqyests per second per prefix',
                            's3 byte range fetches --> parallelize gets',
                        'Select and Glacier Select',
                            'retrieve less data by using sql, can filter by rows and columns',
                            'server side data filtering before returning',
                        'Event Notification',
                            'generate thumbnails of images uploaded in s3',
                            'destinations can be SNS, SQS, Lambda or event bridge',
                            'basic idea is you can react to events happeing in s3, uploads, downloads, relications, ect',
                        'Request Pays',
                            'requester pays for the download cost of the object in s3',
                            'requester must be authenticated in aws',
                        'Glacier Vault Lock',
                            'adopt WORM policy (write once, read many)',
                            'create a vault lock policy',
                            'lock the policy for future editing',
                        'Batch Operations',
                            'perform bulk operations on existing s3 objects with a single request',
                            'use S3 Inventory to get object list and S3 select to filter objects',
                        'Object Lock',
                            'worm model',
                            'can block an object version for a specific amount of time',
                            'Retention Modes',
                                'Compliance: versions cant be overwritten, retention modes cant be changed or shortened',
                                'Governance: most users cant overwrite or delete object version or alter lock settings but some users have secial permissions',
                                'must set retention period',
                                'legal hold protects the object indefinitly',
                                'must have se:PutObjectLegalHold IAM permission to set or delete legal holds',
                        'AccessPoints',
                            'custom access points for certain user groups with designated policies of what they can do with that data they have access to',
                            'Object Lambdas can makes changes to object depending on what access group is requesting it',
                        'CORS',
                            'Cross Origin Resource Sharing',
                            'origin: scheme(the protocol), host(the domain) & a port number',
                            'can allow traffic from anyhwere to particular origins',
                            '',
                        'Websites',
                            'can host static websites',
                            'must make sure the bucket policy allows for public reads',
                        'BucketPloicies',
                            'JSON based',
                            'can block buckets & objects from public access ',
                        'Security',
                            'ARN should be filled with the bucket name',
                            'use "*" or "/*" to include all of a thing' ,
                            'User-based: IAM policies',
                            'Resource-based: Bucket policies',
                                'Object ACL (access control list)',
                                'Bucket ACL',
                            'MFA requirement for bucket access & permissions',
                            'pre-signed urls that are valid for a limited time or only accessable from a particular origin',
                            'logs, api call data, ect',
                        'Encryption',
                            'SSE-S3:', 
                                'encrypts objects using keys managed by aws', 
                                'done serverside', 
                                'uses aes256', 
                                'must set header --> "x-amz-server-side-encryption": "aes256")',
                            'SSE-KMS:',
                                'aws key management service', 
                                'must set header --> "x-amz-server-side-encryption": "aws:kms")',
                            'SSE-C:',
                                'managing you own encryption keys',
                                'must use HTTPS mandatory',
                                'done serverside using data keys',
                                
                            'ClientSideEncryption',
                                'uses AWSS3 Encryption Client',
                                'client encrypts data before sending to s3, must decrypt themselves when retrieving from s3',
                            'HTTP endpoints not encrypted',
                            'HTTPS endpoints encrypted in flight aka SSL TLS',

                    ], 
                    CloudFront: [
                        'CloudFront is a CDN with 216 global edge locations',
                        'Origins',
                            'S3 Bucket, Custom HTTP (load balancer, ec2, s3 website or any http backend)',
                            'if origin in ec2, it must be a public instance',
                        'GeoRestriction',
                            'whitelist or blacklist certain areasa',
                            'best for static content',
                    ],
                    GlobalAccelerator: [
                        'same as cloudfront except',
                            'improves performance of apps over tcp/udp',
                            'proxying packets at edge locations to apps in one or more regions',
                            'good for non-http use cases, http with static ip or fast deterministic failover',
                            ''
                    ]
                }},
                {dataStorageRequirements : {
                    durability: {
                        question: 'How should data be stored to prevent data corruption??',
                        example: 'Outages, Hardware Failure',
                        methods: 'Redundancy'
                    },
                    availability: {
                        question: 'Which data storage system should be available to deliver data??',
                        example: 'Server/Network Failure, Speed, Compatability, Security',
                        methods: {
                            RedundancyBackups: [
                                'stored in seperate locations or distributed network', 
                                'RAID configuration (redundant array of independent disks)',
                            ],
                            DLP: [
                                'data loss prevention tools'
                            ],
                            EasureCoding: [
                                'fragment data, encode the fragments and distribute it'
                            ],
                        }
                    },
                    latency: {
                        question: 'How fast should the data be available?',
                        example: 'time elapsed between client request and and response'
                    },
                    throughput :  {
                        question: ' What read/write requirements does the data have?',
                        example: 'iops'
                    },
                    size :  {
                        question: ' What is the data storage capacity requirements?',
                        example: 'GB, TB, MB, ect',
                        methods: 'how big are your data components X how many components will you need'
                    },
                    load :  {
                        question: 'How many concurrent users need to be supported?',
                        example: '10, 100, 1000, 100000, ect',
                        methods: ''
                    },
                    integrity :  {
                        question: 'How is the accuracy and consistency of the data maintained?',
                        example: 'Domain, Entity, Referential, User-Defined',
                        methods: {
                            Domain: 'type system', 
                            Entity: 'primaryKeys / unique identification', 
                            Referential: 'forigenKeys' , 
                            UserDefined: 'conditionalUpdates'
                        },
                    },
                }},
                {databases: {
                    RDS: 
                        [
                            'Relational Database Service: supports all rdbs engines',
                            'allows you to create databases in the cloud and have them managed by AWS',
                                'Backups',
                                    'automated and  auto-enabled',
                                    'logs are backed up every 5 mins',
                                    'restore at any point in time from oldest to 5 mins ago w/ 7 to 35 days retention',
                                'Snapshots',
                                    'manually triggered by user',
                                    'retention as long as desired',
                                'StorageScaling',
                                    'maximum storage threshold',
                                    'dynamically increase storage on your instance',
                                    'automatically scales when running out of free storage',
                                'ReadReplicas',
                                    'https://getyarn.io/yarn-clip/af8ca78b-7a54-4bbf-bbff-216e24d979c8',
                                    'https://getyarn.io/yarn-clip/17bda1d2-6cdd-430b-a388-d065188b6b49',
                                    'https://getyarn.io/yarn-clip/92282725-b49b-4648-aed7-43a6260c477c',
                                    'fees applied when relpicas are outside of the region',
                                    'scaling db reads',
                                    'up to 5 read replicas, can be within AZ, cross AZ or cross region',
                                    'replication is async',
                                    'UseCases',
                                        'for lightening load on main db, could be for analytics, highly utilized serveices, ect',
                                'MultiAZ (DisasterRecovery)',
                                    'you get a standby database that only takes syncronous read from the master db',
                                    'replication is syncronous',
                                    'you get 1 DNS name for automatic failover',
                                    'read replicas can be setup used as multiAZ',
                                    'switching from single to multi az does not require stopping the db (snapshot is taken of the maindb, spinup a standby, standby syncs with main, done!)',
                                'Security',
                                    'at rest encryption is defined at launch time',
                                    'in flight encryption use TLS root certificates, TLS ready by default',
                                    'use IAM roles to connect to db instead of username and pw EXCEPT Oracle. Oracle DB does NOT support IAM authentication',
                                    'NO ssh unless you use custom RDS',
                    ],
                    Aurora: 
                        [
                            'works like Postgres or mySQL',
                            'can add ML predictions to apps, uses SageMaker(ml models) & Comprehend(sentiment analysis)',
                            'optimized internally by AWS, 3x to 5x better than other rdbs',
                            'storage automatically grows from 10gb up to 128tb',
                            'up to 15 replicas',
                            'stores 6 copies of you data across 3 AZs',
                            'does replication, selfhealing and auto expanding',
                            'ReaderEndPoint: points to replicas and load balances at the connection level',
                            'WriterEndPoint: points to master',
                            'Endpoints: you can use custom endpoints to use for replicas that you want to service certain workloads',
                            'MultiMaster: Immediate failover for writer nodes',
                            'Global:', 
                                'less than 1 second for cross-region replication when Aurora is in Global mode',
                                '1 primary region',
                                '5 secondary regions',
                                '16 read replicas per secondary region',
                                '1 minute for promoting additional region',
                    ], 
                    ElastiCache: [
                        'Caching Patterns',
                            'Lazy Loading: all read data is cached but can become stale',
                            'Write Through: adds/ updates data in the cache when written to db',
                            'Session Store: stores temporary session data',
                        'manages Redis or Memcached the same way RDS manages the rdbs',
                        'Redis: MultiAZ with auto failover, read replicas backup and restore features',
                            'can set pw/token for authentication',
                            'supports SSL in flight encryption',
                        'Memcached: uses sharding, multi-threaded architecture. no replication, persistence or backup/restore',
                            'supports SASL based authentication'
                    ],
                    DocumentDB: [
                        'AWS version of MongoDB'
                    ],
                    Neptune: [
                        'fast, reliable, fully managed graph database service',
                        'highly available, with read replicas, point-in-time recovery, continuous backup to Amazon S3, and replication across Availability Zones.',
                        'ecure with support for HTTPS encrypted client connections and encryption at rest',
                        ' quickly and easily process large sets of user-profiles and interactions to build social networking applications',

                    ],
                    Keyspaces: [
                        'open source nosql distrubuted, apache cassandra compatible service',
                        'uses QCL',
                    ],
                    QLDB: [
                        'Quantum Ledger Database',
                        'data is immutable',
                        'like blockchain but theres no decentralized component for financial regulation reasons'
                    ],
                    Timestream: [
                        'time series database',
                        'stored in memory and cost-optimized storage',
                        'used for IOT, realtime analytics'
                    ],
                    DBMS: [
                        'easy to use',
                        'Databse Migration Service - helps you migrate databases to AWS quickly and securely.' ,
                        'database remains fully operational during the migration, minimizing downtime to applications that rely on the database.', 
                        'continuously replicate your data with high availability and consolidate databases into a petabyte-scale data warehouse by streaming data to  Redshift or s3',
                        'enables you to seamlessly migrate data from supported sources to relational databases, data warehouses, streaming platforms, and other data stores in AWS cloud',
                        'allows migration of full and change data capture (CDC) files to these services.',
                    ],
                }},
                {dataAnalytics: [
                    {Athena: [
                        'serverless query service to analyze s3 data, uses SQ, $5 per TB of scanned data',
                        'supports csv, json and other file formats',
                        'commonly used with AWS Quicksight',
                        'use colmnular data for saving on costs (apache Parquet or ORC file formats)',
                        'compress data for costs savings',
                        'partition datasets in s3 for more effiect querying',
                        'DOES NOT have indexes'
                    ]},
                    {Redshift: [
                        'NOT used for OLTP, IS used for OLAP(online analytical processing)',
                        'uses columnar storage and parallel querying',
                        'faster queries, joins and aggregations because it DOES have indexes',
                        'leader node is for query planning and aggregating results',
                        'compute node is for performing queries and sending results back to leader',
                        'manually set node size',
                        'can reserve instances for cost savings',
                        'NO multiAZ mode, MUST use snapshots that can be taken in time or capacity intervals',
                        'can copy snapshots of a cluster into other regions',
                        'data is ingested using kinesis, s3 copy command or JDBC driver(for on prem data)'
                    ]},
                    {OpenSearch: [
                        'same as elastic search',
                        'search engine capabilities and analytical capabilities',
                        'uses its own querying language'
                    ]},
                    {EMR: [
                        'Elastic Map Reduce',
                        'helps create Hadoop clusters for analyzing and processing large amounts of data',
                        'comes with spark, flank, ect <-- configured by AWS',
                        'master node --> manages cluster, coordinates, manages health, Long running',
                        'core node --> run tasks and store data, Long running',
                        'task node --> ONLY runs tasks',
                        'uses spot instances, cheaper way, usually used with task nodes',
                        'costs saving --> min 1 year reservation',
                        ''
                    ]},
                    {QuickSights: [
                        'serverless machine learning powerd BI service to create dashboards',
                        'can use in-memory if data is imported directly into quicksight'
                    ]},
                    {Glue: [
                        'a managed ETL service',
                        'not good for copying data into, significant development efforts to write custom migration scripts to copy the database data into Redshift.',
                        'prepare and transform data',
                        'glue data crawler: crawls aws data sources and sends to glue data catalog',
                        'glue job bookmarks:  prevent reprocessing of old data',
                        'glue elastic views: combine and replicate data across multiple data stores using SQL,',
                        'glue data brew: clean/normalize data using prebuilt transformation',
                        'glue studio: GUI to create, run and monitor ETL jobs in glue',
                        'glue streaming: etl built on apache, compatible with kenisis, kafka and MKS(managed kafka)'
                    ]},
                    {LakeFormation: [
                        'creates data lakes',
                        'automates lake construction and de-duplicates using ML transforms',
                        'combine structured and unstructured data in data lake',
                        '',
                        '',
                    ]},
                    {Kafka: [
                        'MSK --> managed kafka service',
                        'alternative to kinesis',
                        'kafka cluster is made of multiple brokers'
                    ]}
                ]},
            ],
            performance: [
                {stratagies: 
                    [
                        {cachingAndRouting: {
                            browserCaching:{},
                            apiCaching: {},
                            databseCaching: {},
                            applicationCaching: {},
                            Route53: [
                                {DNSRouting:{
                                    routingStrategy: 'route to nearest server by ip location',
                                    routingPolicies: {
                                        simple: 'default all to one resource',
                                        activePassiveFailover: 'app goes down in one region, traffic routed to another region',
                                        geoLocation: 'ips go to servers based on geolocation',
                                        geoProximity: 'geolocation but with ability to go to other nearby locations if necessary',
                                        latencyPolicy: 'serve traffic from region where lowest latency can be achieved',
                                        weightedPolicy: 'ab testing for establishing a control region',
                                    },
                                    healthChecks: [
                                        'only avaibale for public resources',
                                        ''
                                    ],
                                    DomainRegistrar: [
                                        'godaddy, route53, ect'
                                    ],
                                    DNSRecords:[
                                        'define how to route traffic to a particular domain',
                                        'RecordTypes',
                                            'A: maps a hostname to a public ipv4',
                                            'AAAA: maps a hostname to a private ipv6',
                                            'CNAME: maps hostname to another hostname, cant create for top node',
                                            'NS: name servers for the hosted zones', 
                                            'Alias: AWS resources expose an aws hostname. Aliases point host names to AWS resources',
                                        'Hosted Zones',
                                            'Public Hosted Zones: records that specify how to route traffic on internet (public domain names)',
                                            'Private Hosted Zones: routing traffic with vpcs (private domain names)',
                                        'TTL',
                                            'Mandatory for each DNS record',
                                            'HighTTL: 24hrs',
                                            'LowTTL: 60seconds',
                                            '',
                                            '',
                                            '',
                                    ],
                                    ZoneFile: [

                                    ],
                                    NameServer: [
                                        'resolves DNS queries'
                                    ],
                                    DNSMap: {
                                        Steps: [
                                            '0. ip addresses with domain name segemnts are held in Root, TLD and SLD servers',
                                            '1. user types address',
                                            '2. browser sends to local dns server',
                                            '3. local dns makes call to ROOT dns server with address, validates the root and send ip portion back to local dns',
                                            '4. local dns makes call to TLD dns server with address and validates the root and send ip portion back to local dns',
                                            '5. local dns makes call to SLD dns server with address and validates the root and send ip portion back to local dns',
                                            '6. address is completly validated, local dns'
                                        ],
                                    },
                                    DomainNameStructure: [
                                        {
    
                                            FQDN: [
                                                'fully qualified domain name',
                                                'http://api.www.example.com.'
                                            ],
                                            Protocol: [http],
                                            DomainName: ['api.www.example.com'],
                                            SubDomain: ['.api'],
                                            SLD: [
                                                'second level domain',
                                                '.example.com'
                                            ],
                                            TLD: [
                                                'top level domain',
                                                '.com, .gov. .us, .org'
                                            ],
                                            Root: '.'
    
                                        }
                                    ],
    
                                }}
                            ],

                            CDN:{},
                            memory:{},
                            loadBalancing: {
                                ELB: [
                                    'Elastic Load Balancer',
                                        'create headers in load balancer',
                                        'Health Checks',
                                            'is a EC2 instance working properly?',
                                            'health checks are done on a port and a route with http',
                                            'if status is not 200, the instance is unhealthy',
                                        'Types',
                                            'ALB (Application Load Balancer) --> Layer 7: http, https, websockets',
                                                'PROVIDES ONLY STATIC DNS',
                                                    'Headers',
                                                        'X-Forwarded-For: header for identifying the originating IP address of a client connecting to a web server through a proxy server.',
                                                        'X-Forwarded-Proto: header for identifying the protocol (HTTP or HTTPS) that a client used to connect to your proxy or load balancer',
                                                        'X-Forwarded-Port: helps you identify the destination port that the client used to connect to the load balancer',
                                                        'Accept: header indicates which content types, expressed as MIME types, the client is able to understand',
                                                        'Accept-CH: ',
                                                            'Network',
                                                                'Downlink: request header field provides the approximate bandwidth of the clients connection to the server, in Mbps.',
                                                                'ECT: request header field indicates clients connection type: slow-2g, 2g, 3g, 4g',
                                                                'RTT: request header field provides the approximate round trip time on the application layer, in milliseconds, includes server processing time',
                                                            'Device',
                                                                'Device-Memory: request header field indicates the approximate amount of available RAM on the client device',
                                                        'If-Match: request header makes a request conditional. server will only return requested resources if the resource matches one of the listed ETag values',
                                                        'Range: request header indicates the part of a document that the server should return (Range: bytes=200-1000, 2000-6576)',
                                                        'ETag: response header is an identifier for a specific version of a resource. It lets caches be more efficient and save bandwidth, as a web server does not need to resend a full response if the content was not changed.',
                                                        'Server-Timing: communicates one or more metrics and descriptions for a given request-response cycle',

                                                    'Target Groups:',
                                                    'EC2 instances, ECS tasks, Lambda Functions, private IP addresses',
                                                'Load balancing to target groups (multiple http applications)',
                                                'Load balancing to containers, vm, ect (multiple applications on the same machine)',
                                                'Routing based on url path, hostname or query strings',
                                                'All ALB host names are fixed',
                                                'CrossZoneLoadBalancing is always on, cant disable',
                                            'NLB (Network Load Balancer) --> tcp, tls, udp',
                                                'PROVIDES BOTH STATIC DNS AND STATIC IP ',
                                                'Target Groups:',
                                                        'If you specify targets using an instance ID, traffic is routed to instances using the primary PRIVATE IP address specified in the primary network interface for the instance',
                                                        ' public IP address cannot be used to route the traffic to the instance if specifying targets using instance id.',
                                                        'EC2 instances, private IP addresses, Application Load Balancers',
                                                        '1 static IP address per AZ, can attach an Elastic IP address to it.',
                                                        'used for extreme performance',
                                                        'CrossZoneLoadBalancing is off by default but can enable',
                                            'GLB (Gateway Load Balancer) --> layer3, ip protocol',
                                                'Target Groups:',
                                                    'EC2 instances, private IP addresses',
                                                'uses the GENEVE protocol on port 6081',
                                                'distributes traffic to virtual appliances',
                                        'StickySessionsLoadBalancing --> (client is always directed to the same instance)',
                                            'ApplicationCookies:',
                                                'CustomCookies:',
                                                    'generated by the target',
                                                    'can include any custom attributes required by client',
                                                    'cookie name must be specified individually for each target group',
                                                'AppCookie:',
                                                    'generated by the load balancer',
                                            'DurationCookies:',
                                                'generated by load balancer',
                                        'CrossZoneLoadBalancing ---> (each instance distributes evenly across all registered instances in an AZ)', 
                                        'Non-CrossZoneLoadBalancing ---> (each instance distributes evenly across ONLY the registered targets in its Availability Zone.)',
                                        'SSL&TLSCertificates',
                                            'SSL(Secure Sockets Layer) --> certificate allows in transit traffic encryption',
                                                'encrypts connections',
                                            'TLS(Tranport Layer Security) --> certificate allows in transit traffic encryption',
                                                'modern version of SSL',
                                            'Certificate Authorities',
                                                'issueres of public certificates',
                                            'AWS_ACM',
                                                'AWS Certificate Manager',
                                            'SNI(Server Name Indication) ==> client must indicate hostname of target server in initial SSL handshake',
                                                ' allows you to expose multiple HTTPS applications each with its own SSL certificate on the same listener.',
                                            'can upload your own certificates',
                                            'set up HTTPS listner',
                                            'must specify default certificate',
                                            'add optional certificates to support multiple domains',

                                    ],
                                layer4: 'distrubutes based on info in the packet header',
                                layer7: 'distrubutes based on full packet contents',
                                
                            }
                        }},
                        {technologySelection: {
                            serverInstances: {},
                            containerization: {
                                howItWorks: 'applications packaged with all necessary components which makes it deployable anywhere ',
                                tools: 'Docker',
                                hostedBy: 'ran on Operating System --> Linux, Windows, ect',
                                location: 'developer work station or data center',
                                cost: 'free / open-source',
                                availability: 'can run over period of time',
                                languages: 'server host must support language --> ',
                                features: 'complete control over enviornment',
                                useCases: 'microservices, lift & shift, from on prem to cloud',
                                ECS: [
                                    'Elastic Contain Service',
                                    'launch ECS class on ECS cluster, must provision and maintain infastructure',
                                    'Fargate Type',
                                    'serverless, just make task definitions. runs based on cpu/ram. scaling just requires more tasks',
                                    'Load Balancing:',
                                        'Application Load Balancer --> used for most cases',
                                        'Network Load Balancer --> used for high throughput / performance requirements, paired with AWS private link',
                                    'Data Volumes',
                                        'uses EFS because its a network file system, works with EC2 and Fargate and can share same data/files for any task running in the same AZ',
                                        'fargate w/ efs = serverless',
                                        'S3 can NOT be mounted as a file system',
                                        'use cases are for persistent multi AZ shared storage',
                                    'Cluster',
                                        'create cluster, name it and choose vpc',
                                        'choose infastructure --> EC2 or Fargate',
                                        'check ASG for if you did EC2 launch type',
                                    'Service',
                                        'create task definition, name it, incluse image uri from docker',
                                        'configure enviornment',
                                    'AutoScaling',
                                        'scales on 3 catagories --> cpu, ram or ALB request count per target',
                                        'can scale based on target metric tracking, step scaling or scheduled scaling',
                                        'scaling on task level is NOT same as scaling on instance level',
                                    'scaling EC2 --> ',
                                        'Auto Scaling Group Scaling --> based on cpu, add instances over time',
                                        'Cluster Capacity Provider --> auto provisioing and infastructure scaling for ECS tasks, paired with ASG, adds EC2s when missing capacity',
                                    '',
                                    'SolutionsArcitecture',
                                        'Event Bridge --> Event Bridge Schedule --> SQS Queue',
                                ],
                                ECR: [
                                ' Elastic Container Registry',
                                    'dockerhub alternative but offers private repository as well as public',
                                    'used for storing images',
                                    '',
                                    '',
                                    '',
                                    '',
                                'Firehose',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                ],
                                EKS: [
                                    'Elastic Kubernetes Service',
                                        'used to launch Kubernetes clusters on AWS',
                                        'supports EC2 so you can deploy worker nodes or Fargate to deploy serverless containers',
                                        'Node Types --> managed(part of asg), self-managed(uses pre-built ami or optimized ami), Fargate',
                                        'Data Volumes --> specify storageClass on EKS cluster manifest, leverages CSI(container storage interface)'
                                ], 
                                AppRunner: [
                                    'deploy apps and apis at scale',
                                    'start with source code or cotainer image',
                                    'auto scaling, load balancing, availabily, and encryption',
                                    'can connect to databases, caches and queues'
                                ]
                            },
                            serverless: {
                                howItWorks: 'computing resources are managed for you. just focus on writing code',
                                tools: ['AWS Lambdas, Azure Functions, Google Cloud Functions'],
                                hostedBy: 'ran on specific platforms --> AWS, Azure, ect',
                                location: 'public cloud',
                                cost: 'billed per use',
                                availability: 'ran as long as it takes to run the function',
                                languages: 'runtime host must support language --> certain platforms support certain languages',
                                features: 'enviornment handle for you',
                                services: ['lambdas', 'dynamoDB', 'cognito', 'apiGateway', 's3', 'sns/sqs', 'kinesis', 'auorora', 'stepFunctions'],
                                Lambdas: [
                                    'free tier --> 1000000 requests and 400k gbs of compute time, .20 per million requests afterwards',
                                    'Pay Per Call --> can provision of to 10gb of ram per functions, increasing ram improves cpu and network',
                                    'Pay Per Duration --> 400k gb per second of compute time for 1GB ram, 3.2 mill seconds id 128 mb ram',
                                    'Lambda Container Image',
                                        'must implement Lambda runtime API',
                                        'ECS or Fargate preferred when using Docker',
                                    'Limits',
                                        'Execution',
                                            'memory allocation --> 128mb to 10gb, 1mb increments',
                                            'max execution time --> 900 seconds(15mins)',
                                            'env variables --> 4kb',
                                            'use function container for loading files, 512mb to 10gb, use tmp folder',
                                            '1k conncurrent executions',
                                        'Deployment',
                                            'deployment size --> 50mb max compressed zip, 250mb max uncompressed',
                                            'can use tmp folder to loading files also',
                                            'env variables 4kb',
                                            '',
                                            '',
                                    'Edge',
                                        'deploy functions with CloudFront CDN',
                                        'use Lambdas to change CloudFront requests & responses',
                                            'viewer request',
                                            'origin request',
                                            'origin response',
                                            'viewer response',
                                            'can generate responses without ever sending request to origin',
                                            'use cases --> dynamic web apps, seo,  smart acess origin and sata scnter routing, bot mitigation, realtime imgae trandformation, a/b testing, usr auth',
                                    'VPC',
                                    'VPC sharing allows multiple AWS accounts to create their application resources into shared and centrally-managed vpcs',
                                        'launched outside of VPC, handles by AWS',
                                        'use rds proxy to make database calls by pooling and sharing db connections but lambda functions must be deployed inside VPC to do so',                                 
                                    'DynamoDB',
                                        'fully managed by AWS, scales massivle, highly availability',
                                        'standard and infrequently accessed tiers',
                                        'max dize --> 400kb',
                                        'DAX (DynamoBD Accelerator)',
                                            'cache engine for dynamodb',
                                            'microsecond latency',
                                            '5 min ttl default',
                                            'use cases --> caching individual objeccts, queries and scans',
                                        'Stream Processing',
                                            'reacts to realtime changes, send user welcome email after signup, realtime analytics, cross region replication, invoke lambdas on dynamodb changes ',
                                            '24 hr retention, limited users, process using Lambda triggers or dynamodb stream kinesis adapter',
                                            '',
                                            '',
                                    'API Gateway',
                                        'create REST API that invokes Lambda functions',
                                        'exposess HTTP endpoints in the backend',
                                        'use cases --> rate limiting, cacing, user authentication, api keys, ',
                                        'authentication --> IAM, Cognito or custom authorizer with Lambda',
                                    'Step Functions',
                                        'build serverless visual workflow',
                                        '',
                                        ''
                                ]
                            }
                        }},
                        {networkPerformance: {
                            layer4: 'routing packets based on packet header'
                        }}
                    ]
                },
                {latency: ''},
                {throughput: 'os-level: data transfer between cpu & ram, db-level: number of transactions per second'},
                {concurrency: 'multiple tasks at same time'},
                {parallelism: 'divide enormous task into smaller tasks'}
            ],
            securityAndCompliance: [
                {KMS: [
                    'Key Management Service --> encrypted at rest',
                    'can be fully managed aws encryption keys',
                    'automatic key rotation when aws managed, 1yr. can be enabled with customer managed keys ',
                    'Symmetric --> aes256, single encryption key used to encrupt and decrypt. ',
                    'Asymmetric --> rsa and ecc key pairs. public(encrypt), private(decrypt)',
                    'CustomerManaged: --> $1 per month per key',
                    'pay for all api calls to kms, $.03 per 10k calls',
                    'key policies come in default --> everyone has access, custom --> user defined',
                    'MultiRegionKeys --> replicated keys spread across regions, each key is managed independently'
                ]},
                {SSMParameterStore: [
                    'secure store for configuration and secrets',
                    'serverless, scalable, versionable,',
                    'uses policies'
                ]},
                {SecretsManager: [
                    'stores secrets, can rotate on daily basis'
                ]},
                {CertificateManagement: [
                    'manages certificates for free with automatic renewal',
                    'ACM',
                    'list domain name to be included in certificate',
                    'select validation method --> dns or email (dns is preferred for automation purposes, uses cname records in dns config) email will send emails to contact address in the who is database',
                    'after a few hrs, itll be verified and automatically renewed',
                    'with API Gateway',
                        'EdgeOptimized --> requests routed through cloudfront edge locations, tls cert must be in same region as cloudfront, setup cname or a-alias record in route 53',
                        'Regional --> for clients in the same region, must be imported on api gateway in same region as api stage, setup cname or a-alias record in route 53',
                        '',
                        '',
                        '',
                ]},
                {WAF: [
                    'Web Application Firewall',
                    'protects applications from common layer 7 http exploits',
                    'define web acl(access control list) rules',
                        'up to 10k ips, http headers, body or uri strings protect from sql injections and cross site scripting, size constraints, geomatch, ratebased rules for ddos',
                        ''
                ]},
                {Shield: [
                    'DDOS(Distributed Denial Of Service) protection',
                    'standard --> free for all aws customers, advanced --> 3k per month, protects aginst more sophisticated',
                    '24/7 access to DRP (DDOS Response Team)',
                    'operates at layer3/4, advanced version of shild includes WAF'
                ]},
                {FirewallManager: [
                    'manages rules in all accounts in a organization',
                    'Security Policy: common set of security rules, rules are supplied to new resources automatically'
                ]},
                {GuardDuty: [
                    'intelligent threat discovery using ML, 30 day trial',
                    'observes logs and events'
                ]},
                {Inspector: [
                    'automated security assessments',
                    'findings are sent to eventbridge'
                ]},
                {Maice: [
                    'fully managed data security and data privacy service'
                ]},
                {authenticationAndAuthorization},
                {webSecurity},
                {networkSecurity},
                {infastructureSecurity},
                {dataSecurity}
            ],
            recoverability: [
                {DisasterRecovery: [
                    'on prem to other on prem location',
                    'hybrid --> on prem to cloud',
                    'cloud region  to cloud region',
                    'rpo --> and rto  optimization: recovery point + disaster point = data loss. disaster point + return point = downtime',
                    '4 disater recovery stratagies',
                        '1: backup and restore --> high rpo',
                        '2: pilot light --> small critical components only version is always up an running --> mid rpo',
                        '3: warm  --> full system up and running at minimum size, ready to be scaled',
                        '4: multisite, hotsite --> full production scale already running',
                    'DMS: Database Migration Service',
                        'use SCT(Schema Conversion Tool) to convert schema to from one engine to another',
                    'Application Discovery Service: gaters info about on prem service to plan migration',
                        'agentless discovery using Agentless Discovery Connector',
                        'agentbased discovery using Application Discovery Agent',
                    'Server Migration Service: incremental replication of on premise live AWS servers',
                    'Backup: fully managed service to backup you aws services',
                        'backupPlans: frequency, window, transition to cold and retention',
                        'can use vault lock to prevent accidental or malicious deletes',
                    'MGN (Application Migration Service)',
                        'fka aws server migration service',
                        'aka lift and shift',
                        'do staging, cutover then push into production',
                    'transfering large files --> internet(about 100mbs), directConnect(1gbps), snowball(ordered from aws, delivered, data transfered to it, then sent back to aws to upload)',
                    '',
                    '',
                ]}
            ],
            maintainability: [
                {CICD}
            ],
            extensibility: [
                {decouplingAndLooseCoupling}
            ],
            reliability: [
                {selfHealing:' https://getyarn.io/yarn-clip/68a5d18a-aca7-4885-960c-ad4f1ecf7d6b'},
                {faultTolerance},
            ],
            availability: [
                {availabilityZones}, 
                {applicationReplicas},
            ],
            scalability: [
                'ASG (AutoScalingGroup) --> horizontal scaling to match increased load',
                    'LaunchTemplate',
                        'specifies instance configuration information such as the ID of the Amazon Machine Image (AMI), the instance type, a key pair, security groups, and the other parameters that you use to launch EC2 instances',
                        'defining a launch template instead of a launch configuration allows you to have multiple versions of a template',
                        'AMI + Instance Type',
                        'EC2 User Data',
                            'EC2 instance user data is the data that you specified in the form of a configuration script while launching your instance.',
                            'use EC2 user data to customize the dynamic installation parts at boot time, rather than installing the application itself at boot time',
                        'EBS Volumes',
                        'Security Groups',
                        'SSH Key Pairs',
                        'IAM Roles',
                        'Network & Subnet info',
                        'Load Balancer info',
                    'Mix/Max Size',
                    'LifeCycleHooks:  hooks let you create solutions that are aware of events in the Auto Scaling instance lifecycle, and then perform a custom action on instances when the corresponding lifecycle event occurs',
                    'Default Termination Policy:  balance across AZs first, then terminates based on the age of the Launch Configuration.',
                    'ScalingPolicies',
                        'ReactiveScaling: all types of scaling polocies / stratagiess are customized',
                            'TargetingScaling: "average CPU to be below 40%" ',
                            'StepScaling: CloudWatchAlarm is triggered @ CPU > 70% to add 2 units && CPU < 30%',
                            'ScheduleActions: -->> "increase minimum capacity to 10 between 5pm and 11pm" ',
                        'PrediectiveScaling: continuously forecast load & schedule scaling',
                            'Metrics To Scale By: CPU Utilization, Request Count Per Target, Average Network IO, custom metrics ',
                    'can scale based on AWS Cloud Watch Alarms',
                    'scales outwards and inwards based on demand',
                    'can set min/max/desired number of instances running all times',
                    'automatically registered to load balancer',
                    'unhealthy instances are dropped and new ones are created',
                {whatToScale : 
                    {
                        serverScalingAndElasticity, 
                        staticContentScaling, 
                        databaseScaling
                    }
                },
                {howToScale: 
                    {
                        predictiveScaling, 
                        reactiveScaling
                    }
                }
            ],
            usabilityAndAccessability: [
                {internetConnectivity},
                {deviceCompatability},
                {interoperability: 
                    {dataFormatting, api},
                    
                },
                {portability}
            ]
        }
    },
    AWS: {
        RegionsAndAvailabilityZones: [
            'Each region has multiple availability zones'
        ],
        Access: {
            AccessPoints: ['CLI', 'SDK', 'Console'],
            AccessMethods: [
                {Cognito: [
                    'gives users an identity to interact with web and mobile apps',
                    'Cognito User Pools',
                        'gives signin functionaloty for app users and can intergrate with API gateway and application Load Balancers',  
                        'a serverless DB of users',
                    'Cognito Identity Pools',
                        'gives temporary aws access to resources directly(not api gateway or laod balancer, straight to resource) and intergrates with user pools',
                        'uses tokens in exchance for access',
                        'can be used for row level security in dynamodb',
                    '',
                    '',
                ]},
                {AWSOrganizations: [
                    'manage multiple AWS accounts, main acct is manageement acct, others are member accounts (members can only belong to 1)',
                    'Organizational Unit --> management account --> sub OUs --> member accts',
                    'uses SCP(Service Control Policies) applied to OUs or accounts to restrict Users and Roles ',
                    'management accts always have full prevlidges, even when you apply an SCP to it, the default full permissions override it',
                ]},
                {IAM: {
                    MFAandSSO: 'identity and authentication',
                    SecurityCredentials: {
                        accessKey: 'username',
                        secretAccessKey: 'password',
                        permissionsAndPolicies: 'Policy consists of SID, Effect, Principal, Action, Resource & Condition. JSON docs that set permission policies for groups or individuals'
                    },
                    UsersAndRoles : {
                        Users: "a single user",
                        Roles: " allowing services to interact with each other, roles are created for services like lamdas or ec2, takes, name, policies and description",
                        Groups: "multiple users with the same permissions"
                    },
                    CredentialReport: 'an IAM security tool',
                    IAMConditions: [    'aws:SourceIP: restrict clientIP from where the API calls are being made',
                        'Aws:RequestedRegion: restrict region APU calls are made to',
                        'restrict based on tags',
                        'or can force MFA',
                        'roles override original permissions when assined',
                        'when using resource based policy, principal doesnt have to give up permissions',
                        'resource based allows for more flexibility',
                        '',
                    ]
                }},
            ]
        },
        CostExplorer: [
            'helps you identify under-utilized EC2 instances that may be downsized on an instance by instance basis within the same instance family',
            'understand the potential impact on your AWS bill by taking into account your Reserved Instances and Savings Plans',
        ],
        ComputeOptimizer: [
            'recommends optimal AWS Compute resources for your workloads to reduce costs and improve performance by using machine learning to analyze historical utilization metrics'
        ],
        MachineLearning: [{
            Rekognition: [
                'find objects people, text, scenes in images and video using ML',
                'facial analysis and faciel search to do user verifiication, people counting, ect'
            ],
            Transcribe: [
                'automatically convert speech to text',
                'use cases --> customer service calls, closed captioning, meta data for media assets searchability'
            ],
            Polly: [
                'automatically converst text to speech',
                'can create pronunciation lexicons',
                'can use SSML (Speech Synthesis Markup Language)',
                    'emphasizes specific words/phrases',
                    'phonetic pronunciation',
                    'breathing, wispering',
                    'newscaster style speaking'
            ],
            Translate: [
                'translates text into different languages'
            ],
            LexAndConnect: [
                'Lex',
                    'ASR(Automatic Speech Recognition), convert speech to text',
                    'uses NLU(Natural Language Understanding)',
                    'use cases --> chatbots, call center bots',
                'Connect',
                    'recieve calls, create contact flows',
            ],
            Comprehend: [
                'NLP(Natural Language Processing) --> ',
                'determine langaue of a text. extract phrases, places, people, brands, events. sentiment analysis. ',
                'Medical',
                    'useful unstrustured clinical text'
            ],
            SageMaker: [
                'build ml models'
            ],
            Forecast:[
                'use ml to deliver highly accurate forecasts'
            ],
            Kendra:[
                'document search service using machine learning',
                'extracts answers from within a document'
            ],
            Personalize:[
                'build apps with personalized recomendations'
            ],
            Textract:[
                'extract text from any scanned document and return a json file'
            ],
        }],
        HPC: [
            'high performance computing',
            'AWS Direct Connect --> Move GBs of data into the cloud over private secure network',
            'AWS Snowball --> Move PB of data to the cloud',
            'AWS DataSync', 
                'online data transfer service that simplifies, automates, and accelerates copying large amounts of data between on-premises storage systems and AWS Storage services, as well as between AWS Storage services',
                
                'Large data between on prem data and s3, efs, fsx(windos only) ',
            'EC2 Enhanced Networking --> SRIOV --> use ENA(elastic network adapter) --> gives up to 100 gbps or Intel 82599 up to 10 gbps',
            'EFA(Elastic Fabric Adaptar) --> same as ENA, only works for linux',
                'uses MPI (Message Passing Interface)',
            'AWS Batch --> run multi-node parallel jobs which enable you to run single jobs that span multiple ec2 instances',
            'AWS Parallel Cluster --> cluster management for HPC, automate VPC, Subnet cluster and instance type creations',
        ],
        EC2:{ 
            notes: [
                'EC2 is IAAS',
                'EC2s have key-pairs',
                'ec2s have elastic ips',
                    'https://getyarn.io/yarn-clip/734d351a-8bf7-4661-9c9e-3ba580320ae2',
                    'https://getyarn.io/yarn-clip/3f82c9ff-8cd0-4218-9116-eaec7973eb9e',
                    'https://getyarn.io/yarn-clip/dc69f40a-4ddb-4f5e-a209-47f3c0c26648',
                    'https://getyarn.io/yarn-clip/2fcb4df7-e7dd-41f9-bdb2-480b9497e35c',
                    'https://getyarn.io/yarn-clip/d7f83951-1e86-4e67-915c-7cbc3250c727',
                    'https://getyarn.io/yarn-clip/c7ca2478-c53f-48ee-8949-171774135fed',
                    '',
                'security group',
                'https://getyarn.io/yarn-clip/4b19834d-d11c-493b-b658-74d16809bdcf',
                'https://getyarn.io/yarn-clip/1dbd5cc1-cfd2-42b5-82b3-17052aa036cf',
                'https://getyarn.io/yarn-clip/82d8406a-324f-434c-9642-1cc07bfe74f1',
                'https://getyarn.io/yarn-clip/76f2ed1c-b9db-412e-9c31-65afff5b3062',
                'https://getyarn.io/yarn-clip/a33397e0-cf80-4369-b4d2-893ace67d49e',
                'https://getyarn.io/yarn-clip/98927e48-13a2-4c69-8211-c325888aadc2',
                'https://getyarn.io/yarn-clip/343fb2af-5485-4a0d-9d8a-97d01fcab5e7',
                'https://getyarn.io/yarn-clip/1b5ee12a-120e-4d70-8231-2ccb010b7e1f',
                    'acts as a virtual firewall which basically means it controls and regulates incoming and outgoing traffic',
                        'https://getyarn.io/yarn-clip/0205188b-0811-4f42-8255-948065c892a3',
                        'https://getyarn.io/yarn-clip/b1fd977b-ae74-4671-a275-af5a690abdad',
                        'https://getyarn.io/yarn-clip/26a63989-7d45-4e7b-8492-417f892c38e3',
                        'https://getyarn.io/yarn-clip/6f7c5283-a814-4c38-a280-a2f6cb9c3b85',
                        'https://getyarn.io/yarn-clip/8652457d-f4fa-49ea-b3b5-6b449c1b1755',
                        'https://getyarn.io/yarn-clip/9df3c10d-01d6-47e0-a576-f203a17f28c2',
                        'https://getyarn.io/yarn-clip/aff2b287-afa2-4968-881e-5c9e62e2722c',
                        'https://getyarn.io/yarn-clip/b045b307-bd6d-4888-a02c-44371399fd65',
                        'https://getyarn.io/yarn-clip/f660fa0b-317b-4274-ad0f-ae726ce2db9d',
                        'https://getyarn.io/yarn-clip/60989c77-59cf-4bd9-ab4e-97c9afb4a700',
                        'https://getyarn.io/yarn-clip/0de0d1cb-fc70-4402-b4d0-0dc7bed8ee04',
                        'https://getyarn.io/yarn-clip/a82d23cb-73b8-4292-979b-f0090e47ed1f',
                        'https://getyarn.io/yarn-clip/ea183ec0-d7ac-4ace-a04d-3152b8a2ea89',
                        '',
                'consisting of a public key and a private key, like a un&pw, is a set of security credentials that you use to prove your identity when connecting to an Amazon EC2 instance',
                    'https://getyarn.io/yarn-clip/9c94fb24-86c8-48bc-af1d-389a5dfbcdf1',    
                    'https://getyarn.io/yarn-clip/0d194836-7744-46eb-970e-959e1de2e465',
                    'https://getyarn.io/yarn-clip/34c84300-ddb3-4ec7-8a90-05d56b9cec11',    
                    'https://getyarn.io/yarn-clip/908a8e65-ade4-4270-bc26-4ca1527d950b',
                    'https://getyarn.io/yarn-clip/c52119d6-0b0c-4fc6-b22d-74e0b2674c27',
                    'https://getyarn.io/yarn-clip/90be5f80-6305-47ed-8d32-78d862c0467d',
                    'https://getyarn.io/yarn-clip/d913f996-7168-4407-9959-71b71fbf4085',
                    'https://getyarn.io/yarn-clip/a9968685-a15a-4ed1-a3f3-b8e98f84d54e',
                    'https://getyarn.io/yarn-clip/2531863e-181b-4557-9c72-46b5c61dccd4',
                    'https://getyarn.io/yarn-clip/dab8a511-e820-4898-a770-866b592aa5d2',
                    'https://getyarn.io/yarn-clip/f9e0e5af-eeb0-4906-9da1-1d0d1e10d7fc',
                    'https://getyarn.io/yarn-clip/e466462e-9354-4ac4-8db1-64d3fa28bc65',
                    'https://getyarn.io/yarn-clip/479af477-2304-492e-b59c-ba02938b6622',
                    'https://getyarn.io/yarn-clip/f59bbd41-41f2-4ea9-aa9b-4d267f73d673',
                    'https://getyarn.io/yarn-clip/4d842a18-b0a6-4e26-9b20-b6785f0c096d',
                    'https://getyarn.io/yarn-clip/045c65a3-3a2c-4818-bcc1-788dbd40b453',
                    'https://getyarn.io/yarn-clip/910fd37b-8fa5-4016-9e17-b3dac24e1e5e',
                    'https://getyarn.io/yarn-clip/48bfef43-ddac-4f6b-8024-55c916d15aab',
                    'https://getyarn.io/yarn-clip/ae28179d-4f51-4027-87dd-6382f34325a9',
                    'https://getyarn.io/yarn-clip/b9126b9c-532c-4b71-9927-7144029c1818',
                    '',
                'EC2s are cloud servers that come in Instances',
                'https://getyarn.io/yarn-clip/c3d10f4b-33f1-4645-a2ce-04cfdfce9971',
                'https://getyarn.io/yarn-clip/bf4100f3-fd7b-47f0-a7dd-180bcc33aee7',
                'https://getyarn.io/yarn-clip/55d3d7ad-f39d-4f0a-9df2-c4108b9d2327',
                    'Each ec2 needs an AMI in order to be created, an ami is a amazon machine image',
                    'https://getyarn.io/yarn-clip/912e719f-17ad-4fe6-8637-2309e53b21ac',
                    'https://getyarn.io/yarn-clip/a27a1117-2dbf-4aeb-a9d4-64785087bc30',
                    'https://getyarn.io/yarn-clip/149cb775-6fd7-4867-9d2c-5e2f36c6bafc',
                    'https://getyarn.io/yarn-clip/a91296a9-dcba-44ac-a87d-41126b132007',
                    'https://getyarn.io/yarn-clip/bca2b502-6d88-4fac-b534-d39cbb767f45',
                        'an ami is like a blueprint that specify how you want you ec2 image launched',
                        'each ami contains snapshots or template',  
                            'root block device that must tell you what kind of operating system to use and can tell you what will be on the server',
                            'https://getyarn.io/yarn-clip/18b16974-2048-43b6-9a32-a049e1b8e5b8',
                            'https://getyarn.io/yarn-clip/e930c28a-e706-4d27-9a9c-dc0646906c29',
                            'https://getyarn.io/yarn-clip/7e0ed5de-8a36-449e-9070-df34e9867867',
                            'https://getyarn.io/yarn-clip/f8189d95-de88-4fd0-8653-586f03e8ae8c',
                            'permissions for which aws accounts can launch instances',
                            'https://getyarn.io/yarn-clip/3994d2aa-4574-4f29-8104-5d5e289cffef',
                            'https://getyarn.io/yarn-clip/c0aa8798-0070-4a38-9021-4419f50749d1',
                            'https://getyarn.io/yarn-clip/47765f8c-1d5e-4bb1-a0d9-39505d96255e',
                            'https://getyarn.io/yarn-clip/51a95b01-e55c-4cd1-9792-da06734d7954',
                            'block device mapping that specifies what additional storage volumes to attach to the instance when its created ',
                            'https://getyarn.io/yarn-clip/6b8515a9-8fab-474f-a95d-083ea2e4a310',
                            'https://getyarn.io/yarn-clip/7f54edc7-a6c5-495d-99d6-0c3379a573f5',
                            'https://getyarn.io/yarn-clip/b04ccfa3-4fb8-44f8-819d-6e9375a7d558',
                            'https://getyarn.io/yarn-clip/3cd13140-bb17-4d56-93a5-5af11b5abb0c',
                            'https://getyarn.io/yarn-clip/bb7309b5-10e4-4276-b1b7-287cf4c99fc1',
                    'Each ec2 is created in a specific region that you choose',
                    'https://getyarn.io/yarn-clip/6510d8d9-7bd0-4bdb-9ca2-1173452a7b98',
                    'https://getyarn.io/yarn-clip/cd12dc2f-4161-409b-9d83-fcca06c2511e',
                    'https://getyarn.io/yarn-clip/e494d952-f496-433f-a1db-f468f6cc0fed',
                    'https://getyarn.io/yarn-clip/939b6c37-0938-4ffa-8c15-173dbd18b573',
                    'https://getyarn.io/yarn-clip/427c9c3b-472a-46b2-b69f-410bd80fd507',
                    'https://getyarn.io/yarn-clip/d0860330-a151-441e-a0d3-25968699d174',
                    'https://getyarn.io/yarn-clip/1e6ac2a3-f883-4099-bf3e-12d4338892b6',
                    'https://getyarn.io/yarn-clip/91f33fc3-065b-4086-9e69-782ab267fd4e',
                    'https://getyarn.io/yarn-clip/b8f05ee8-0263-4348-89c0-e81b3aee17aa',
                        'a region is a literal geographic location',
                        'each region has availabilty zones which are areas inside a region',
                        'https://getyarn.io/yarn-clip/1c628c92-29c6-4a97-83a8-9fa5aaad0204',
                        'https://getyarn.io/yarn-clip/46de5538-47ac-4b66-b431-1d4df14f0a9e',
                        'https://getyarn.io/yarn-clip/5fa50834-dec0-433e-a78e-4b029e248be7',
                        'https://getyarn.io/yarn-clip/9f6cc7f0-3082-4c01-9429-2ce357403f0f',
                        'https://getyarn.io/yarn-clip/e3bed134-3a53-4f3d-a4b3-e1cf59dc9343',
                        'https://getyarn.io/yarn-clip/89d6531b-6d86-43e2-8764-1571383a37c7',
                        'https://getyarn.io/yarn-clip/dbe40fa6-85b8-4899-9b4c-e1da1a15b8eb',
                        'https://getyarn.io/yarn-clip/40c37e52-0a0e-4c28-84f7-c59a0be3f3c7',
                        'https://getyarn.io/yarn-clip/abafcb9a-af04-41a2-863d-e8fa4ef31608',
                        'https://getyarn.io/yarn-clip/b387a877-2a2f-4beb-a281-6c52686e98f5',
                    'Each instance has a specified Type',
                        'general', 
                            'https://getyarn.io/yarn-clip/6db97d7d-cdd2-4e6c-8453-66b79faa536a',
                            'https://getyarn.io/yarn-clip/35a77338-9b47-4a95-8883-a5d97cfc5795',
                            'https://getyarn.io/yarn-clip/b3141565-e84a-47fb-939a-af216445a543',
                        'compute', 
                            'https://getyarn.io/yarn-clip/f2b499ea-9b07-48d3-8db1-fe2907ff8f4d',
                            'https://getyarn.io/yarn-clip/fbd09b7e-9a5d-4022-8146-1e047a252182',
                            'https://getyarn.io/yarn-clip/9dbfdc08-9fdb-46a2-a7c4-276d4b31ae04',
                            'https://getyarn.io/yarn-clip/5631ca13-d901-49f8-9578-bcd5ee59a46a',
                            'https://getyarn.io/yarn-clip/972a6f0b-d342-4670-90eb-112519392d09',
                            'https://getyarn.io/yarn-clip/4f4ae513-9e36-46cd-bc79-f274107bebbb',
                            'https://getyarn.io/yarn-clip/87322452-97e3-4dee-8075-097cafefdce2',
                            '',
                        'memory', 
                            'https://getyarn.io/yarn-clip/faed5f0b-a341-480e-bbc4-e1c9bc4c6b79',
                            'https://getyarn.io/yarn-clip/e8b1c55a-40ea-4c5e-a931-4633b8578bc0',
                            'https://getyarn.io/yarn-clip/499131f6-53ed-43ba-a464-6c824d84b88d',
                            'https://getyarn.io/yarn-clip/6fdce3d0-5fd9-404f-974b-26b5ab78cc7b',
                            'https://getyarn.io/yarn-clip/70613e3a-ec6a-4dc3-9695-353e2f458359',
                            'https://getyarn.io/yarn-clip/334d0812-ae8b-47a7-9aa7-efd661250424',
                            'https://getyarn.io/yarn-clip/32b4c0ec-fa37-4490-9997-77028f203a72',
                            'https://getyarn.io/yarn-clip/71a42044-b81d-4b6a-a122-0a3e81c8eed3',
                        'accelerated', 
                            'https://getyarn.io/yarn-clip/f20e2a7a-b334-417f-9bab-d80577ea6627',
                            'https://getyarn.io/yarn-clip/de6e2a91-5c62-4380-9fd7-829a6f3dd090',
                            'https://getyarn.io/yarn-clip/1d0bed10-3aa6-401c-aaf8-c9f7fdcc84c9',
                            'https://getyarn.io/yarn-clip/d99ead15-ffb5-49ee-8392-4a8cdacf6cd7',
                        'storage',
                            'https://getyarn.io/yarn-clip/334e698d-94cc-46e0-96ea-03252a542b6d',
                            'https://getyarn.io/yarn-clip/6e0cc0c9-10cc-4518-ac94-35feea584178',
                            'https://getyarn.io/yarn-clip/6e50991f-1b1c-4c91-ac03-5f133d45f901',
                            'https://getyarn.io/yarn-clip/24e3eab2-5dd0-4817-a5e2-433120341f70',
                            'https://getyarn.io/yarn-clip/3ef6e620-e0ab-4dd2-9b7e-73ff7f0bbf76',
                            'https://getyarn.io/yarn-clip/0501d3e7-5d60-4945-b467-f4af4934476d',
                            'https://getyarn.io/yarn-clip/63836760-0d40-4df2-a3e8-776d914a880a',
                            'https://getyarn.io/yarn-clip/de289959-3030-44b2-946c-c5783e423220',
                            'https://getyarn.io/yarn-clip/e21a7a86-c570-477c-92cb-a38576a5e80b',
                            'https://getyarn.io/yarn-clip/c3ff860a-bff3-4203-86b3-061eb4bf6d94',
                    'Each instance can be tracked and managed with a tag',
                        'https://getyarn.io/yarn-clip/102292a8-f3d0-4a0b-8445-c5dc16adaec7',
                        'https://getyarn.io/yarn-clip/b3bda4be-5ba5-41cc-9a2b-ca85fcc4c0a1',
                        'https://getyarn.io/yarn-clip/dd71bf5d-347d-488f-8013-79d4f8489c33',
                        'https://getyarn.io/yarn-clip/a3d85867-eeed-4c21-bb94-b6dc8981270c',
                        'https://getyarn.io/yarn-clip/3817573e-2271-47d5-88bb-b572aa79413d',
                        'https://getyarn.io/yarn-clip/581eb06a-8229-49fd-bdeb-04f1cdd2e7cd',
                
                'your ec2 security group must allow traffic from application load balancers before they can be marked healthy by the elastic load balancer'
            ],
            AMI:[ 
                'Amazon Machine Image is a customization of an EC2 instance',
                'Since its pre-packaged, yo get a faster boot time',
                'Built for specific regions but can be copied across regions',
                'AMIs are built for a specific AWS Region, theyre unique for each...', 
                    'AWS Region. You cant launch an EC2 instance using an AMI in', 
                    'another AWS Region, but you can copy the AMI to the target', 
                    'AWS Region and then use it to create your EC2 instances.',
            ],
            Host : [
                'launch ec2 on physical servers you already have or a dedicated to you from aws on request ',
                'this makes it to where any server-bound licenses or address locality requirements can be met'
            ],
            Instance: {
                ip: {
                    notes: 'use elastic IP so that you IP address doesnt change between stops and starts',
                    types: ['public, private, elastic'],
                },
                description: {
                    notes: 'the EC2 naming convention is ==> m5xl',
                    M: 'instance class',
                    [5]: 'generation',
                    xL: 'size withing that type of class'
                },
                types: {
                    generalPurpose: 'balance of compute, memory & networking',
                    computeOptimized: 'heavy stuff, machine learning, gaming, ect',
                    memoryOptimized: 'high performance, caching, real-time data processing, inmemory dbs',
                    storageOptimized: 'high frequency and high sequential read/writes, relatiional and no-relational dbs, cache, data warehousing, distributed file systems',
                }, 
                purchasingOptions: {
                    notes: 'use the vacation traveling stay analogy',
                    onDemand: 'Hotel: ==> short, predictable, pay per second, full price',
                    reserved: 'Resort: ==> discount if paid upfront, longer commited to fixed params, discounted',
                    savingsPlan: 'Resort ==> discount if paid upfront, reserved with loose params',
                    spot: {
                        notes: 'Hotwire.com ==>  short, cheap, volitale, based on whats available that theyre trying to get rid of',
                        useCases: {
                            batchJobs,
                            analyticsAndAnalysis,
                            imageProcessing, 
                            distributedWorkloads,
                            flexibleStartAndStopTimes
                        },
                        spotInstances: [
                            'define max spend, get instances while current price is less than max spend',
                            'number of instances',
                            'launch specs',
                            'requestType: one-time or persistent',
                            'duration: valid from, valid until',
                            'to terminate ==> stop spot request, then terminate instances'
                        ],
                        spotFleet: [
                            'these are spot instances with spot fleets',
                            'define launch pools: AZ, instance type, OS',
                            {stratagies: {
                                price: 'launces from pool with lowest prices',
                                diversified: 'launches from all pools: {useCases: longer workloads, availabily necessary}',
                                optimalCapacity: 'launches from pool with optimal capacity for number of instances you wanna run'
                            }}
                        ],
                    },
                    dedicatedHost: {
                        notes: "AirBandB ==> shared physical server",
                        
                        useCases: {
                            regulatoryAndComplianceRequirements,
                            LicensingIssues: 'https://getyarn.io/yarn-clip/63af0f3e-ad5b-4b94-a0aa-4b1d05af1685',

                        }
                    },
                    dedicatedInstance: 'own instance on your own hardware',
                    capacityReservation: 'RentalProperty ==> reserve capacity in specific AZ'
                },
            },
        },
        XRay: [
            'helps developers analyze and debug production, distributed applications, such as those built using a microservices architecture',
            'identify and troubleshoot the root cause of performance issues and errors.',
            'provides an end-to-end view of requests as they travel through your application, and shows a map of your application’s underlying components'
        ],
        CloudWatch: [
                'delivers a near real-time stream of system events that describe changes in Amazon Web Services (AWS) resources',
                'metrics for every service in AWS and belong to namespaces and have timestamps',
                'dimensions are attributes of a metric and can have up to 10 attributes per metric',
                'can create custom metrics',
                'metrics can be streamed to a destination outside of cloudwatch',
                'logs are stored in groups and can be sent to s3, kinesis, lambda or elastisearch',
                'must run CloudWatch Agent get EC2 logs. LogsAgent can only send to CloudWatch Logs. UnifiedAgent can get additional system-level metrics()configuration using SSM Parameter Store',
                    'ram, netstat, processes, swap space, disk metrics, granular CPU metrics',
                'alarms --> can be trigger for any metric. used for ec2, autoscaling or sns messaging',
                'EventBridge',
                    'schedule cron jobs',
                    'starts a a source --> ec2, codebuild, s3, trusted advisor, cloutrail',
                    'eventbridge sits in the middle',
                    'destinations --> compute(lambda, batch, ecs task), intergration(sqs, sns, kinesis), orchestration(step functions, codepipeline, codebuild), maintenance(ssm, ec2 actions)',
                'Insights',
                    'monitoring and troubleshooting for serverless apps running on lambda',
                    'collects aggregates and summarizes system level metrics and diagnostic data',
                    'ecs, eks, fargate lambdas and makes dashboards from logs',
                '',
                '',
                '',
                'Firehose',
                '',
                '',
                '',
                '',
                '',
                '',
                'Firehose',
                '',
                '',
                '',
                '',
                '',
                ''
        ],
        CloudTrail: [
                'provides governance, compliance and audit for your aws acct and is anabled by default',
                'pull history of events and api calls made by acct using console, sdk or cli or services',
                'can be applied to all regions or a single region',
                'management events--> ops performed on resources',
                'data events--> not logged by default be cause of high frequency, gets, puts on s3, ect',
                'Insights',
                    'detect unusual activity in your acct, creates baseline and works off that',
                    'stored for 90 days, if you want to go 90+, log to s3 then analyze with Athena',

        ],
        Config: [
            'help with auditing and compliance of aws resources',
            'comes with aws prewritten rules or can make customs ones',
            'automate remediation usiong SSM automation docs'
        ],
        Networking: [
            'Virtual Private Cloud  ---> VPC ',
                'can have 5 VPCs per region', 
                ' provides the facility to create an IPsec VPN connection (also known as Site-To-Site VPN) between remote customer networks and their Amazon VPC over the internet',

            'vpc console wizard provides 4 config options',
                'VPC with a single public subnet  ---> for basic single-tier public facing app(like a blog or singlepage site, no backend components)',
                'VPC with public and private subnets ---> for public facing app with private backend',
                'VPC with public and private subnets and AWS Site-to-Site VPN access ---> cloud and internet access from vpc, public front end with private backend connected with site to site vpn',
                'VPC with a private subnet only and AWS Site-to-Site VPN access --> extend your network into the cloud using Amazons infrastructure without exposing your network to the Internet.',
            
            'IGW --> allows resources like ec2 to connects to internet',
            'must be created seperatly from a VPC',
            'only 1 VPC per IGW',
            'must edit route tables',
            'CIDR --> Classless InterDomain Routing: a method for allocating IP addresses',
                'help to define ip address range',
                'baseIP --> before the slash',
                'subnetMask --> after the slash',
                'ips are made of 2 octets',
                'subnets start at 32 which equates to 1 ip address(2^0 up to 2^16)',
                '31 --> 2, 30 --> 4, 29 --> 8, 24 --> 256',
                '------>',
                'create and name vpc',
                'create ec2 and allow shh access',
                'create subnets(subrange if ipv4, aws reserves 5), private and public',
                'make cidr block for set ip number options, private should have more than public',
                    'can enable auto assigning, its disabled by default but changing it in subnets will reflect in ec2',
                'enable internet connectivity by creating an internet gateway and route tables',
                    'attach the internet gateway to a vpc',
                    'create a public and private route table',
                    'assign subnets to coorsponding route tables',
                    'edit routes to allow direct local traffic and public traffic(send to IGW)',
                'Bastion Host',
                    'ec2 instance that uses bastion host security group inside a public subnet',
                    'send traffic to bastion host and allow bastion host to send public traffic to private subnet since theyre both inside the same vpc and have access to each other',
                    'must allow internet traffic but restricted to certain ips',
                
                'NAT Gateway',
                    'Network Address Translation',
                        'use a (NAT) instance in a public subnet in your VPC to enable instances in the private subnet to initiate outbound IPv4 traffic to the Internet or other AWS services, but prevent the instances from receiving inbound traffic initiated by someone on the Internet',
                        'AWS managed, higher bandwith, high availabily',
                        'pay per hr for usage and bandwith',
                        'cant be used by ec2 instance in same subnet',
                        'requires an igw',
                        '5gbps bandwith, autoscales up to 45 gbps',
                        'no security groups to manage',
                        'resilient with single AZ, must create multiple NAT gateways in multiple AZs for fault tolerance',
                    'NAT Instance',
                        'ec2 instances in private subnet to connet to internet',
                        'must be launched in a public subnet and disable source/destination check',
                        'must have elastic ip attached',
                        'route tables must be configured to route traffic from private subnets for the NAT instance',
                        'bandwith depends on instance type',
                    'NACL',
                        'traffic hits NACL before hitting subnet',
                        'stateless where as security groups are stateful',
                        'like firewalls that control traffic to and fom subnets',
                        'define rules with numbers, lower numbers = higher priorities and can override higher numbers. ',
                        'last rule is asterisk and rules should increment by 100',
                        'good for blocking ips at the subnet level',
                        'default nacl accepts all inbound and outboud with subnest associated',
            'Ephemeral Ports',
                'for any 2 endpoint to connect, they must use a port',
            'VPC Peering',
                'privatly connect 2 pcs using aws network',
                'must not have overlapping cidrs',
                'not transative, must establish connection for each vpc that needs to communicate with each other ',
                'must update rout tables in each vpc subnet to ensure ec2 instances can communicate with each other',
            'VPC Endpoints',
                'interface endpoint --> provisions a eni (privateip) as an entry, cost = per hr + per gb',
                'gateway endpoint --> provisions a gateway and must be used as target in route table, supports s3 and dynamo and cost = free',
                'most times use gateway unless you require on prem access',
            'VPC Flow Logs',
                'capture info about IP traffic going into your interfaces --> flow logs, subnet flows, ENI flow logs',
                'helps monitor and troubleshoot connectivity issues, can go to s2 or cloudwatch logs',
                'captures network information from aws managed interfaces',

            'Site To Site VPN ---> enables you to securely connect your on-premises network or branch office site to your Amazon Virtual Private Cloud',
                '5 concepts',
                    '1: Virtual Private Gateway aka VPN Gateway ---> ',
                        'secure connection between your on-premises equipment and your VPCs',
                    '2: VPN Connection ---> ',  
                        'secure connection between your on-premises equipment and your VPCs.',
                    '3: VPN Tunnel ---> ',
                        'an encrypted link where data can pass from the customer network to or from AWS.',
                    '4: Customer Gateway Device -->', 
                        'hysical device or software application on the customer side of the Site-to-Site VPN connection',
                        'use public internet routable ip address or public ip address of nat device id nat traversal is enabled',
                    '5: Customer Gateway --->', 
                        'resource that provides information to AWS about your Customer Gateway device',

             'VPN Cloudhub', 
                'If you have multiple AWS Site-to-Site VPN connections, you can provide secure communication between sites using the AWS VPN CloudHub',
                'secure communication between multiple vpn connections: connect multiple VPN connections on the same VGW set up dynamic routing and configure routing tables',
            'DX(Direct Connect) --> provides dedicated private connection from remote network to VPC',
            'dedicated connection must be setup between DC and aws direct connect',
            'must setup Virtual Private Gateway on you VPC and access public abnd private resources on same connection',
            'use cases --> increase bandwith throughput, more consistent network experience, hybrid enviornments',
            'Direct Connect Gateway -->> to setup DC to 1 or more VPC in many different regions, you must use a Direct Connect',
                'dedicated connections -->1gbps, 10gbps, 100gbps, physical dedicated ethernet port, request made to aws the direct connect partners',
                'hosted connections --> 50mbps, 500mbps, 10gbps, connection requests made via aws direct connect partners, capacity can be added or removed on demand with 1, 2, 5 and 10 gbps available',
                '1month+ lead time to establish connection',
                'not encrypted by default but is private, encryption requires cirect connect plus vpn',
                'to get high resillency for critical workloads --> once connection, multiple locations',
                'to get MAX resillency --> seperate connections terminating on seperate devices in more than 1 location ',
            'Transit Gateway',
                'transitive peering between thousands of vpc and on prem',
            'ecmp --> equal cost muti path routing: foward a packet over multiple best path',
                'usecase: ctreate site to site vpn connections',
            'VPC Traffic Mirroring',
                'capture and inspect network traffic',
            'source and target in same vpc or have vpc peering ',
            'ipv6',
            ''
        ],
        FSxLustre: [
            'easy and cost-effective to launch and run the world’s most popular high-performance file system',
            'workloads such as machine learning, high-performance computing (HPC), video processing, and financial modeling',
            'fast storage – where you want your storage to keep up with your compute',
            'provides the ability to both process the hot data in a parallel and distributed fashion as well as easily store thecold data on Amazon S3.'
        ]
    },
    architecturalConstraints: {
        notes:'pg37',
        catagories: {
            quality: [],
            time: [],
            scope: [],
            technology: [],
            risk: [],
            resource: [],
            compliance: [],
        }
    },
    technologySelections: {
        notes: [`satisfies current requirements & also future needs`],

        title: '',
        catagory: '',
        functionality: [],
        importance: {
            howImportantIsThis: 0,
            whyIsThisImportant: ''
        },
    },
    ProofOfConceptPrototype: {
        title: '',
        catagory: '',
        functionality: [],
        importance: {
            howImportantIsThis: 0,
            whyIsThisImportant: ''
        },
    },
    SolutionDesignAndDelivery: {
        title: '',
        catagory: '',
        functionality: [],
        importance: {
            howImportantIsThis: 0,
            whyIsThisImportant: ''
        },
    },
    solutionScalingAndEvangelism: {
        title: '',
        catagory: '',
        functionality: [],
        importance: {
            howImportantIsThis: 0,
            whyIsThisImportant: ''
        },
    },
}

const thumbnails = {
    EC2: [
        'Netflix',
        'Twitch',
        'LinkedIn',
        'BBC',
        'ESPN',
        'Facebook',
        'Comcast',
        'Kellogs',
        'Pfizer'
    ],
    Glacier: [
        'NASCAR',
        'Nasdaq',
        'Scribd',
        'Fox News',
        'ASCAP'
    ],
    SNS: [
        'Meta',
        'MongoDB',
        'NASA'
    ],
    VPC: [
        'BlueCross BlueShield',
        'Tableau'
    ],
    Kinesis: [
        'Netflix',
        'Walt Disney Studios',
        'Live Nation',
    ],
    EBS: [
        'Kellogs',
        'Equifax',
    ],
    IAM: [
        'Dow Jones'
    ],
    SQS: [
        'NASA',
        'BMW',
        'Capital One',
        'Pinterest',
        'Medium',
        'Indeed',
        'Peleton',
    ],
    Lambdas: [
        'MLB',
        'The Gurdian',
        'T-Mobile',
        'Vogue',
        'Samsung',
        'Federal Reserve'
    ],
    Redshift: [
        'General Electric',
        'Vizio',
        'Toyota',
        'Fox',
        'Phillips',
        'Nasdaq'
    ],
    Beanstalk: [
        'United Airlines',
        'FannieMae',
        'FreddieMac',
        'Zillow'
    ],
    DynamoDB: [
        'Zoom',
        'SnapChat',
        'Pokemon',
        'Nike',
        'Tinder',
        'Lyft',
    ],
    SageMaker: [
        'ADP',
        'ZocDoc',
        'Nerd Wallet',
        'Capital One',
        'JP Morgan Chase',
        'Citizens Bank',
        'Prudential Financial',
        'Intuit'
    ],
    EFS: [
        'BBC',
        'Tmobile',
        'Discover',
        'Johnson&Johnson',
        'Ancestry',
        'PNC',
    ],
    Cognito: [
        'Sleep Number',
        'Warner Bros',
        'Boston Childrens Hospital'
    ],
    ElasticCache: [
        'DailyMotion',
        'Ring',
        'McDonalds',
        'Expedia',
        'LG',
        'Adobe'
    ],
    RDS: [
        'AirBnB',
        'Panasonic Corp',
        'RedHat',
        'Instacart	'
    ],
    S3: [
        'Siemens',
        'General Electric',
        'Nielson',
        '3M'
    ],
    CloudFront: [
        'Hulu',
        'PBS',
        'Sky News',
        'Dow Jones',
        'Discovery Channel',
        'Kik',
        'Spotify',
        'Slack',
        'Reuters'
    ],
    Templates: [
        'https://www.pond5.com/after-effects/item/81414054-corporate-opener-presentation-business-commercial-intros-sli',
        'https://www.pond5.com/after-effects/item/171162780-simple-clear-corporate-presentation',
        'https://www.pond5.com/after-effects/item/171666260-modern-presentation',
        'https://www.pond5.com/after-effects/item/106986948-dynamic-promo-new',
        'https://www.pond5.com/after-effects/item/76926796-social-media-falling-dominoes',
        'https://www.pond5.com/after-effects/item/121068052-73-maps-and-geo-icons',
        'https://www.pond5.com/after-effects/item/49884372-social-networks-icons-and-logo-animation',
        'https://www.pond5.com/after-effects/item/105407848-flipboard-numbers_text'
    ],
    Tracks: [
        'https://www.pond5.com/royalty-free-music/item/128652744-minimal-technology-science-background',
        'https://www.pond5.com/royalty-free-music/item/164128482-calm-technology-ambient-science-background-documentary',
        'https://www.pond5.com/royalty-free-music/item/95970964-action-sports-dramatic-rock-trailer-powerful-covid-epic-cine',
        'https://www.pond5.com/royalty-free-music/item/146230127-takeover-1-minute-hip-hop-chill-drip-background-trap-dmin-12',
        'https://www.pond5.com/royalty-free-music/item/125903706-bolly-tec-full-track-india-bollywood-hindi-techno',
        'https://www.youtube.com/watch?v=maNSMuvjCLI',
        'https://www.youtube.com/watch?v=H3_ZqnqLyVo',
        'https://www.fiverr.com/aymanarif85/edit-prefect-music-video-editing-for-your-song?context_referrer=search_gigs_with_recommendations_row_3&source=top-bar&ref_ctx_id=a04e334c0b91edbc98c1cdd1e880e838&pckg_id=1&pos=2&ad_key=dd4f4f82-0b66-4379-9a85-86f12b4f7269&context_type=auto&funnel=a04e334c0b91edbc98c1cdd1e880e838&imp_id=3f781ad6-f75a-45db-8c2c-101567ba6342',
        '',
    ]


}