interface MarkedTradersDataType {
    code: number;
    investorName: string;
    ledgerBalance: number;
    rmName: string;
};

type MarkedTraderPayloadType = {
    red: MarkedTradersDataType[]
    yellow: MarkedTradersDataType[]
    green: MarkedTradersDataType[]
}

export const markedTraders: MarkedTraderPayloadType = {
    red: [
        {
            code: 1001,
            investorName: 'Alice',
            ledgerBalance: 5000,
            rmName: 'John'
        },
        {
            code: 1002,
            investorName: 'Bob',
            ledgerBalance: 7000,
            rmName: 'Mary'
        },
        {
            code: 1003,
            investorName: 'Charlie',
            ledgerBalance: 4500,
            rmName: 'Michael'
        },
        {
            code: 1004,
            investorName: 'David',
            ledgerBalance: 6000,
            rmName: 'Sophia'
        },
        {
            code: 1005,
            investorName: 'Eve',
            ledgerBalance: 5500,
            rmName: 'William'
        },
        {
            code: 1006,
            investorName: 'Frank',
            ledgerBalance: 4800,
            rmName: 'John'
        },
        {
            code: 1007,
            investorName: 'Grace',
            ledgerBalance: 7200,
            rmName: 'Mary'
        },
        {
            code: 1008,
            investorName: 'Henry',
            ledgerBalance: 4900,
            rmName: 'Michael'
        },
        {
            code: 1009,
            investorName: 'Isabel',
            ledgerBalance: 6800,
            rmName: 'Sophia'
        },
        {
            code: 1010,
            investorName: 'Jack',
            ledgerBalance: 5300,
            rmName: 'William'
        },
        {
            code: 1011,
            investorName: 'Kelly',
            ledgerBalance: 4700,
            rmName: 'John'
        },
        {
            code: 1012,
            investorName: 'Liam',
            ledgerBalance: 7100,
            rmName: 'Mary'
        },
        {
            code: 1013,
            investorName: 'Mia',
            ledgerBalance: 5200,
            rmName: 'Michael'
        },
        {
            code: 1014,
            investorName: 'Nora',
            ledgerBalance: 6600,
            rmName: 'Sophia'
        },
        {
            code: 1015,
            investorName: 'Oliver',
            ledgerBalance: 4900,
            rmName: 'William'
        },
        {
            code: 1016,
            investorName: 'Penny',
            ledgerBalance: 5000,
            rmName: 'John'
        },
        {
            code: 1017,
            investorName: 'Quinn',
            ledgerBalance: 7300,
            rmName: 'Mary'
        },
        {
            code: 1018,
            investorName: 'Ryan',
            ledgerBalance: 4600,
            rmName: 'Michael'
        },
        {
            code: 1019,
            investorName: 'Sara',
            ledgerBalance: 6900,
            rmName: 'Sophia'
        },
        {
            code: 1020,
            investorName: 'Tom',
            ledgerBalance: 5400,
            rmName: 'William'
        },
        {
            code: 1021,
            investorName: 'Uma',
            ledgerBalance: 4800,
            rmName: 'John'
        },
        {
            code: 1022,
            investorName: 'Victor',
            ledgerBalance: 7000,
            rmName: 'Mary'
        },
        {
            code: 1023,
            investorName: 'Wendy',
            ledgerBalance: 5100,
            rmName: 'Michael'
        },
        {
            code: 1024,
            investorName: 'Xavier',
            ledgerBalance: 6500,
            rmName: 'Sophia'
        },
        {
            code: 1025,
            investorName: 'Yara',
            ledgerBalance: 4700,
            rmName: 'William'
        },
        {
            code: 1026,
            investorName: 'Zack',
            ledgerBalance: 5200,
            rmName: 'John'
        },
        {
            code: 1027,
            investorName: 'Amy',
            ledgerBalance: 7400,
            rmName: 'Mary'
        },
        {
            code: 1028,
            investorName: 'Ben',
            ledgerBalance: 4500,
            rmName: 'Michael'
        },
        {
            code: 1029,
            investorName: 'Chris',
            ledgerBalance: 6700,
            rmName: 'Sophia'
        },
        {
            code: 1030,
            investorName: 'Diana',
            ledgerBalance: 5600,
            rmName: 'William'
        }
    ],
    yellow: [
        {
            code: 1001,
            investorName: 'Alice',
            ledgerBalance: 5000,
            rmName: 'John'
        },
        {
            code: 1002,
            investorName: 'Bob',
            ledgerBalance: 7000,
            rmName: 'Mary'
        },
        {
            code: 1003,
            investorName: 'Charlie',
            ledgerBalance: 4500,
            rmName: 'Michael'
        },
        {
            code: 1004,
            investorName: 'David',
            ledgerBalance: 6000,
            rmName: 'Sophia'
        },
        {
            code: 1005,
            investorName: 'Eve',
            ledgerBalance: 5500,
            rmName: 'William'
        }
    ],
    green: [
        {
            code: 1001,
            investorName: 'Alice',
            ledgerBalance: 5000,
            rmName: 'John'
        },
        {
            code: 1002,
            investorName: 'Bob',
            ledgerBalance: 7000,
            rmName: 'Mary'
        }
    ]
}