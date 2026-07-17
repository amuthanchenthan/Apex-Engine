import { useEffect, useState } from "react";
import { getContract } from "../../blockchain/contract";

function RecentActivity() {

    const [strategies, setStrategies] = useState([]);

    useEffect(() => {

        loadStrategies();

    }, []);

    const loadStrategies = async () => {

        try {

            const contract = await getContract();

            const data = await contract.getMyStrategies();

            const formatted = data.map((s) => ({

                id: Number(s.id),

                name: String(s.name),

                tokenPair: String(s.tokenPair),

                active: s.active,

            }));

            formatted.reverse();

            setStrategies(formatted.slice(0,5));

        }

        catch(err){

            console.log(err);

        }

    };

    return(

        <div className="dashboard-card">

            <h4>Recent Strategies</h4>

            <br/>

            {

                strategies.length===0 ?

                <p>No strategies created yet.</p>

                :

                strategies.map((strategy)=>(

                    <div
                        key={strategy.id}
                        className="d-flex justify-content-between align-items-center mb-3"
                    >

                        <div>

                            <strong>

                                {strategy.name}

                            </strong>

                            <br/>

                            <small>

                                {strategy.tokenPair}

                            </small>

                        </div>

                        <span>

                            {

                                strategy.active ?

                                "🟢 Active"

                                :

                                "🔴 Inactive"

                            }

                        </span>

                    </div>

                ))

            }

        </div>

    );

}

export default RecentActivity;