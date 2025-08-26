import { title } from 'process';
import prisma from '../../config/prisma';
import { Division } from '@prisma/client';
import client from "../../config/sanityClient"

//Getting created/updated team details from sanity
export const handleSanityTeamWebhook = async (body:any) => {

    const {
      _id,
      name,
      logo,
      sport,
      coach,
      division
    } = body;

    const teamId = _id;
    let setDivison:Division;
    let existingSport;

    switch(division.toLowerCase()) {
      case "men":
        setDivison = Division.MEN;
        break;
      case "women":
        setDivison = Division.WOMEN;
        break;
      default:
        setDivison = Division.MIXED;
        break;
    }

    // Check if sport exits
     existingSport = await prisma.sports.findFirst({
      where: {
        name: sport
      },
    })

    if(!existingSport) {
      existingSport = await prisma.sports.create({
        data: {
          name: sport
        }
      })
    }

     await prisma.team.upsert({
      where: { id: teamId },
      update: {
        name,
        logo: logo?.asset?.url || null,
        sportsId: existingSport.id,
        coach,
        division: setDivison,
      },
      create: {
        id: teamId,
        name,
        logo: logo?.asset?.url || null,
        sportsId: existingSport.id,
        coach,
        division: setDivison,
      },
    });

};


// Get created or updated matches
// export const handleSanityMatchWebhook = async (body:any) => {
//    const {
//     _id,   
//      title,
//      date,
//      homeTeam,
//      homeScore,
//      awayTeam,
//      awayScore,
//      season,
//      Lineups
//     } = body

//     console.log("Lineups",Lineups)

//     await prisma.match.upsert({
//         where: { id: _id },
//         update: {
//             matchDate: new Date(date),
//             homeTeam,
//             homeScore,
//             awayTeam,
//             awayScore,
//             season,
//             lineups:{
//                 createMany: {
//                     data: Lineups
//                 }
//             }
//         },
//         create: {
//             id: _id,
//             matchDate: new Date(date),
//             homeTeam,
//             homeScore,
//             awayTeam,
//             season,
//             awayScore,
//             lineups:{
//                 createMany: {
//                     data: Lineups
//                 }
//             }
//         },
//     });
// }

// Get or update matches
export const handleSanityMatchWebhook = async (body:any) => {
   const {
    _id,   
     title,
     date,
     homeTeam,
     homeScore,
     awayTeam,
     awayScore,
     season,
     Lineups
    } = body

    // console.log("Lineups",Lineups)

    const homeTeamId = homeTeam?._ref;
    const awayTeamId = awayTeam?._ref;
    const seasonId = season?._ref;

    if (!homeTeamId || !awayTeamId || !seasonId) {
        console.error("Missing team or season reference");
        return;
    }

   let existingSeason;
     existingSeason = await prisma.season.findUnique({
        where: { id: seasonId },
    });

    if (!existingSeason) {
        // Fetch the season details from Sanity using the seasonId
        const seasonFromSanity = await client.fetch(
            `*[_type == "seasons" && _id == $id][0]{
                _id,
                title,
                startDate,
                endDate
            }`,
            { id: seasonId }
        );

        if (seasonFromSanity) {
            // Create the season in the database if it exists in Sanity
            existingSeason = await prisma.season.create({
                data: {
                    id: seasonFromSanity._id,
                    season: seasonFromSanity.title,
                    startDate: seasonFromSanity.startDate,
                    endDate: seasonFromSanity.endDate,
                },
            });
        } else {
            console.error(`Season with id ${seasonId} not found in Sanity`);
            return;
        }
    }

    await prisma.match.upsert({
        where: { id: _id },
        update: {
            matchDate: new Date(date),
            homeTeamId,
            homeScore,
            awayTeamId,
            awayScore,
            seasonId:existingSeason.id,
        },
        create: {
            id: _id,
            matchDate: new Date(date),
            homeTeamId,
            homeScore,
            awayTeamId,
            awayScore,
            seasonId:existingSeason.id,
        },
    });

    // Function to create lineups
    const createLineups = async (matchId: string, teamId: string, playerRefs: any[], isStarter: boolean) => {
        if (playerRefs && Array.isArray(playerRefs)) {
            for (const playerRef of playerRefs) {
                if (playerRef?._ref) {
                    await prisma.lineup.create({
                        data: {
                            matchId: matchId,
                            playerId: playerRef._ref,
                            teamId: teamId,
                            isStarter: isStarter,
                        },
                    });
                }
            }
        }
    };

    // Call createLineups for home and away teams
    await createLineups(_id, homeTeamId, Lineups?.homeLineup, true); // Assuming homeLineup are starters
    await createLineups(_id, awayTeamId, Lineups?.awayLineup, true); // Assuming awayLineup are starters
    await createLineups(_id, homeTeamId, Lineups?.homeSubstitutes, false); // Assuming homeSubstitutes are not starters
    await createLineups(_id, awayTeamId, Lineups?.awaySubstitutes, false); // Assuming awaySubstitutes are not starters
}

//Get created or updated season
export const handleSanitySeasonWebhook = async (body:any) => {
    const {
        _id,
        title,
        startDate,
        endDate
    } = body

    await prisma.season.upsert({
        where: { id: _id },
        update: {
            season:title,
            startDate,
            endDate
        },
        create: {
            id: _id,
            season:title,
            startDate,
            endDate
        },
    });
}


// Get or upadate players
export const  handleSanityPlayersWebhook = async (body:any) =>{
    const {
        _id,
        name,
        team,
        positions
    } = body

    await prisma.player.upsert({
        where:{id:_id},
        update: {
            teamId:team?._ref,
            name,
            positions
        },
        create: {
            id: _id,
            name,
            teamId:team?._ref,
            positions,
            jerseyNumber:0
        }
    })
} 

export const handleSanityMatchEventsWebhook = async (body:any) =>{
    const {
        _id,
        minute,
        player,
        eventType,
        fixture
    } = body

    switch(eventType.toLowerCase()) {
        case 'goal':
           await prisma.event.upsert({
        where:{id:_id},
        update: {
            minute,
            player,
            type:eventType,
            fixtureId:fixture?._ref
        },
        create: {
            id: _id,
            minute,
            playerId: player?._ref,
            type: eventType,
            fixtureId: fixture?._ref,
            assistId: null,
            subOffId: null,
            subOnId: null
        }
    })
            break;

        case 'yellow card':
            await prisma.event.upsert({
                where:{id:_id},
                update: {
                    minute,
                    player,
                    type:eventType,
                    fixtureId:fixture?._ref
                },
                create: {
                    id: _id,
                    minute,
                    playerId: player?._ref,
                    type: eventType,
                    fixtureId: fixture?._ref,
                    assistId: null,
                    subOffId: null,
                    subOnId: null
                }
            })
            break;
        case 'red card':
           await prisma.event.upsert({
                where:{id:_id},
                update: {
                    minute,
                    player,
                    type:eventType,
                    fixtureId:fixture?._ref
                },
                create: {
                    id: _id,
                    minute,
                    playerId: player?._ref,
                    type: eventType,
                    fixtureId: fixture?._ref,
                    assistId: null,
                    subOffId: null,
                    subOnId: null
                }
           })
            break;
        case 'substitution':
           await prisma.event.upsert({
                where:{id:_id},
                update: {
                    minute,
                    player,
                    type:eventType,
                    fixtureId:fixture?._ref
                },
                create: {
                    id: _id,
                    minute,
                    playerId: player?._ref,
                    type: eventType,
                    fixtureId: fixture?._ref,
                    assistId: null,
                    subOffId: null,
                    subOnId: null
                }
           })
            break;
        default:
            break;
    }
    
}