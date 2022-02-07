import React from 'react';

export default function scoreMaker(scoreData: any) {
  if(scoreData.winner) return <span>{ scoreData.fullTime.homeTeam } : { scoreData.fullTime.awayTeam }</span>
  return <span>– : –</span>
}