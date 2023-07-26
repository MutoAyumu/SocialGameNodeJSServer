import { Session } from "inspector";
import { query } from "../lib/database"
import { getCache } from "../lib/userCache"

export async function index(req: any,res: any,route: any)
{
	console.log(route);
	return null;
}

//ランキング全体のデータを取得
export async function getAllLeaderboard(req: any,res: any,route: any)
{
	//検索する
	const result = await query("SELECT * FROM EventPoint",[]);
	
	return { 
		status: 200,
		leaderboard: result
	};
}

//テーブルにデータが無かったら追加するやつ
export async function create(req: any,res: any,route: any)
{
	if(!route.query.name) return {};
	
	const result = await query("INSERT INTO EventPoint(id, name, point) VALUES(?,?,?)",[route.query.id, route.query.name, 0]);
	
	return { status: 200 };
}

export async function getUser(req: any,res: any,route: any)
{
	const result = await query("SELECT * FROM EventPoint WHERE id = ?",[route.query.id]);
	
	if(!result[0])
	{
		await create(req, res, route);
	}
	
	return { status: 200 };
}
