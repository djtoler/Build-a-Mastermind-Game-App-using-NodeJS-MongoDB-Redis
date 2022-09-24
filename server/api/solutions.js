const { from } = require("form-data")

const solutions = {
    attributesAndPrincipals: {
        RegionsAndAvailabilityZones: {
            CLI_SDK_Console: '3 ways to interact with aws',
            Regions: 'Each region has multiple availability zones',
            IAM: {
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
                CredentialReport: 'an IAM securoty tool'
            },
            EC2: {
                IAAS,
                EC2: {
                    AMI:[ 
                        'Amazon Machine Image is a customization of an EC2 instance',
                        'Since its pre-packaged, yo get a faster boot time',
                        'Built for specific regions and can be copied across regions'
                    ],
                    Instance: {
                        ip: {
                            notes: 'use elastic IP so that you IP address doesnt change between stops and starts',
                            types: ['public, private, elastic'],
                        },
                        description: {
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
                                    LicensingIssues,
                                }
                            },
                            dedicatedInstance: 'own instance on your own hardware',
                            capacityReservation: 'RentalProperty ==> reserve capacity in specific AZ'
                        },
                    },
                    placementGroups: {
                        cluster: {
                            notes: 'instances in a low latency group in 1 AZ, same physical rack',
                            useCases: 'big data done fast, apps that need low latency or/and high throughput'
                        },
                        spread: {
                            spread: 'instances across underlying hardware, max 7 per az',
                            useCases: 'high availability, apps that need to be failue independent of eachother'
                        },
                        partition: {
                            partition: 'seperate racks, scale to hundreds',
                            useCases: 'big data apps'
                        },
                    },
                    eniElasticNetworkInterfaces: {
                        notes: [
                            'logical component in a vpc that represents a virtual network card',
                            'use for saving ips in case of failover',
                            'locked to 1 availabilty zone'
                        ]
                    },
                    KeyPair:" login info if you use ssh",
                    Network: '',
                    StorageConfigs,
                    UserData: 'script to pass into instance on boot',
                    PublicIP: 'accessing ec2, can access this through on browser using http',
                    PrivateIP: 'acceccing ec2 internally'
                },
                EBS: ['Virtual drives, hibernate: 60day max, ram is dumped to EBS on instance shutdown and read back into instance on start up'],
                ELB: 'Load balancing across multiple virtual machines',
                ASG: 'Auto-scaling group',
                Configs: {
                    OS: 'Mac, Windows, Linux',
                    CPU: "# of cores",
                    RAM: 'size of ram',
                    Storage: {
                        EBS: [
                            'Elastic Block Storage = Network attached', 
                            'for data persistece', 
                            '1 instance & 1 AZ at a time but snapshots can be across AZ',
                            'Analogy ==> USB for network',
                            'good for failover because its not physical and can be moved',
                            'Delete On Termination: controls EBS behavior when an ec2 instance is deleted',
                            'Delete On Termination: Roots volume is deleted when ec2 terminates',
                            'Delete On Termination: useCases: preserve root volume when instance is terminated ',
                            'Snapshots = backups, can be in multiple AZ',
                            'Snapshots: can be stored in archive tier, 75% cheaper but takes 24 to 72 hrs to restore',
                            'Snapshots: can alternativly use a recycle bin with a 1 day to 1 year retention',
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
                        instanceStore: [
                            'Better performing alternative to EBS',
                            'Storage is lost if stopped',
                            'Good for buffers, caches temporary content',
                            'High I/O'
                        ],
                        EFS: 'Hardware attached',
                    },
                    NetworkCard: 'speed & public IP',
                    SecurityGroup: {
                        credentials: 'created throuh IAMRole for the instance',
                        access: {
                            ssh: {
                                notes: 'can be used with linux, mac, windows > v10',
                                accessing: {
                                    notes: 'access had a format that looks like "ssh ec2-user@3.250.26.200"',
                                    format: {
                                        label: 'ssh',
                                        defaultUser: 'ec2-user',
                                        ip: '@3.250.26.200'
                                    },
                                    steps: {
                                        a: '1st: set up directory and put pem file in there, ssh into server from that directory',
                                        b: '2nd: protect private key by using==> chmod 040 myPEMfile.pem ',
                                        c: '3rd: use==> ssh -i myPEMfile.pem ec2-user@3.250.26.200'
                                    },
                                }
                            },
                            putty: {
                                notes: 'windows < v10',
                                steps: {
                                    a: 'install putty',
                                    b: 'load pem file into putty',
                                    c: 'paste public hostname with ip into putty config ==> ec2-user@3.250.26.200',
                                    d: 'authorize by clicking auth and pasting ppk file ',
                                    e: 'go back to session and click save',
                                    f:  'if you have security issuse go to pem file properties, securoity tab, advanced, change owner'
                                }
                            }
                        },
                        id: 'all security goups have a unique indentifier',
                        ports: {
                            notes: 'regulate access to ports on server',
                            p22: 'the ssh port used to log into linux ec2 instance, also can upload files with sftp',
                            p21: 'the ftp protocol that uploads files into file share',
                            p80: 'access unsecured http websites',
                            p443: 'access to secured https websites',
                            p3389: 'rdp, remote desktop protocol for logging into windows instance',
                        },
                        ip: {
                            notes: 'regulate ip ranges',
                            defaultAnywhereAccess: '0.0.0/0'
                        },
                        traffic: {
                            types: 'http, ssh, custom',
                            protocols: 'tcp, udp',
                            portRange,
                            source: 'ip address',
                            description: 'describe the traffic source, exp: http test page, app, ect'
                        },
                        notes: {
                            a: 'can be attached to multiple instances like a policy',
                            b: 'locked to region/VPC combination',
                            c: 'time outs mean access denined & connection refused means app error or not yet launched',
                            d: 'inbound traffic blocked by default, outboud traffic authorized by default',
                        }
                    }
                }
            }
        }, 
        moscow: {
            mustHaves: {},
            shouldHaves: {},
            couldHaves: {},
            wontHaves: {}
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
                    {durability},
                    {availability},
                    {latency},
                    {throughhput},
                    {size},
                    {load},
                    {integrity},
                    {type: {
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
                    {storage : {
                        modeling: {
                            entityRelationshipDiagram: '',
                            singleTableDesign: {
                                table: 'whole table',
                                items: 'items equate to rows in a table',
                                attributes: 'items are created with attributes',
                                partitionKey: 'mandataory value that uniquely ids an item same as mongodb _id',
                                sorkKey: 'optional grouping id, for multiple sort keys you have to make a local secondary index, sort keys get turned to indexes the opened up for querying',
                            }
                        },
                        accessMethods: 'block, file or obj',
                        accessPatterns: 'list of ways database will be acessed... exp: get user by email or create game with userid,    sequential or random or read-only, rom vs sam vs ram, ',
                        accessFrequency:'hot: online, warm: offline, cold: archived',
                        updateFrequency: 'write once, read many or dynamic',
                        accessAvailability: 'availability when required',
                        accessDurability: 'reliability of data store to minimize any data loss',
                        accesThroughput: 'iops & r/w ps in MBs',
                        raidConfiguration: 'spreadng data across multiple disks and presenting as 1 logical drive',
                    }}
                ],
                performance: [
                    {caching: {
                        browser:{},
                        DNS:{
                            routingStrategy: 'route to nearest server by ip location',
                            routingPolicies: {
                                simple: 'default all to one resource',
                                activePassiveFailover: 'app goes down in one region, traffic routed to another region',
                                geoLocation: 'ips go to servers based on geolocation',
                                geoProximity: 'geolocation but with ability to go to other nearby locations if necessary',
                                latencyPolicy: 'serve traffic from region where lowest latency can be achieved',
                                weightedPolicy: 'ab testing for establishing a control region',
                            }
                        },
                        CDN:{},
                        memory:{},
                        loadBalancing: {
                            layer4: 'distrubutes based on info in the packet header',
                            layer7: 'distrubutes based on full packet contents',
                            
                        }
                    }},
                    {latency: ''},
                    {throughput: 'os-level: data transfer between cpu & ram, db-level: number of transactions per second'},
                    {concurrency: 'multiple tasks at same time'},
                    {parallelism: 'divide enormous task into smaller tasks'}
                ],
                securityAndCompliance: [
                    {authenticationAndAuthorization},
                    {webSecurity},
                    {networkSecurity},
                    {infastructureSecurity},
                    {dataSecurity}
                ],
                recoverability: [],
                maintainability: [
                    {CICD}
                ],
                extensibility: [
                    {decouplingAndLooseCoupling}
                ],
                reliability: [
                    {selfHealing},
                    {faultTolerance},
                ],
                availability: [
                    {availabilityZones}, 
                    {applicationReplicas},
                ],
                scalability: [
                    {whatToScale : {serverScalingAndElasticity, staticContentScaling, databaseScaling}},
                    {howToScale: {predictiveScaling, reactiveScaling}}
                ],
                usability_accessability: [
                    {internetConnectivity},
                    {deviceCompatability},
                    {interoperability: 
                        {dataFormatting, api},
                        
                    },
                    {portability}
                ]
            }
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
        architecturalConstraints: {
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
        soaServiceOrientedArchitecture: {
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
        queueBased: {
            retryLogic: {
                queuingChainPattern: 'sequential processing needs to be ran on multiple linked systems. the queue holds messages that stay in queue until its picked up and process is confirmed',
                jobObserverPattern: 'servers added and removed by watching messages and responding to threshholds alerts'
            }
        },
        eventDriven: {
            events: 'queue based lets consumers pull, event based pushes messages between compnents to trigger events',
            pubSub: 'when an event is published, a notification is sent to all subscribers of that event',
            eventStream: 'consumer reads from continuous flow of events; exp: clicklogs, video streaming, ect' 
        },
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

    },
}


sdObj = {
    title: '',
    catagory: '',
    functionality: [],
    importance: {
        howImportantIsThis: 0,
        whyIsThisImportant: ''
    },
}