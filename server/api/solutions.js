const solutions = {
    attributesAndPrincipals: {
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
                        accessMethods: 'block, file or obj',
                        accessPatterns: 'sequential or random or read-only, rom vs sam vs ram',
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
        ProofOdConceptPrototype: {
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