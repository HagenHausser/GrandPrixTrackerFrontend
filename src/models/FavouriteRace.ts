export class FavouriteRace {
    season: number;
    round: number;
    raceName: string;
    raceReportUrl: string;
    comment: string;

    constructor(season = 0, round = 0, raceName = '', raceReportUrl = '', comment = '') {
        this.season = season;
        this.round = round;
        this.raceName = raceName;
        this.raceReportUrl = raceReportUrl;
        this.comment = comment;
    }
}