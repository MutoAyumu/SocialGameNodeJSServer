import { query } from "../lib/database"
import { getCache } from "../lib/userCache"

export async function index(req: any,res: any,route: any)
{
	console.log(route);
	return null;
}

//ランキング全体のデータを取得
export async function allLeaderboard(req: any,res: any,route: any)
{
	//ユーザ情報はsessionの中に全部入ってる
	let session = await getCache(route.query.session);
	if(!session)
	{
	  return { status: 200 };
	}
	
	//検索する
	const result = await query("SELECT * FROM EVENTPOINT",[]);
	
	return { 
		status: 200,
		user: result
	};
}

//自身のデータを取得
export async function getUserPoint(req: any,res: any,route: any)
{
    let session = await getCache(route.query.session);
    if(!session)
    {
        return { states: 200};
    }

    const result = await query("SELECT * FROM EVENTPOINT WHERE id = ?",[session.userid]);

    return { 
		status: 200,
		user: result
	};
}

//自身のデータを更新するやつ
export async function postReq(req: any,res: any,route: any)
{
	//ユーザ情報はsessionの中に全部入ってる
	let session = await getCache(route.query.session);
	if(!session)
	{
		return { status: 200 };
	}
	
	await query("UPDATE EVENTPOINT SET point WHERE id = ?",[session.userId]);
	
	return { 
		status: 200
	};
}

