import React from "react";
import { useParams } from "react-router-dom";
import { useDBContext } from "../context/dbContext";
import { MemberType } from "../tables/member";
import _ from "lodash";

type PredefinedSetType = {
  lbl: string;
  set: number;
};

function Function() {
  const { grp } = useParams();
  const local_db = useDBContext();

  const group = React.useMemo(() => local_db.group.filterall([{ attribute: "key", text: grp || "" }])[0], []);

  const [divideResult, setDivideResult] = React.useState<Array<Array<MemberType>>>([]);
  const [keepResult, setKeepResult] = React.useState<Array<PredefinedSetType>>([]);
  const [divideEq, setDivideEq] = React.useState<boolean>(true);

  const onDivide = () => {
    let members = local_db.member.filterall([{ attribute: "group", text: grp || "" }]);
    let secnum = Math.round(Number((document.getElementById("total_sec") as HTMLInputElement).value || 1));

    //create luckydrawBox
    let numpersec = divideEq ? Math.ceil(members.length / secnum) : members.length;
    let luckydrawbox: Array<number> = [];
    for (let i = 1; i <= secnum; i++) {
      luckydrawbox = luckydrawbox.concat(Array(numpersec).fill(i));
    }
    //shuffle luckydrawBox
    for (let i = luckydrawbox.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [luckydrawbox[i], luckydrawbox[j]] = [luckydrawbox[j], luckydrawbox[i]];
    }
    //get your label

    let predefined = [...keepResult];
    // for (let i = 0; i < keepResult.length; i++) {
    //   for (let m of keepResult[i]) {
    //     predefined.push({ lbl: m.key, set: i + 1 });
    //   }
    // }

    let result: Array<Array<MemberType>> = Array(secnum).fill([]);
    for (let m of _.filter(members, (o) => predefined.some((el) => el.lbl === o.key))) {
      let labelidx = -1;

      let pd = _.find(predefined, (o) => o.lbl === m.key);
      if (pd) {
        labelidx = _.findIndex(luckydrawbox, (o) => o === pd?.set);
      }

      if (labelidx === -1) {
        predefined = _.filter(predefined, (o) => o.lbl !== m.key);
        labelidx = Math.floor(Math.random() * luckydrawbox.length);
      }

      let sec = luckydrawbox[labelidx];
      let newArray = [...result[sec - 1]];
      newArray.push(m);
      result[sec - 1] = newArray;
      luckydrawbox.splice(labelidx, 1);
    }
    for (let m of _.filter(members, (o) => !predefined.some((el) => el.lbl === o.key))) {
      let labelidx = Math.floor(Math.random() * luckydrawbox.length);
      let sec = luckydrawbox[labelidx];
      let newArray = [...result[sec - 1]];
      newArray.push(m);
      result[sec - 1] = newArray;
      luckydrawbox.splice(labelidx, 1);
    }
    setKeepResult(predefined);
    setDivideResult(result);
  };
  console.log(keepResult);
  if (group) {
    return (
      <div>
        <h1>{group.groupname}</h1>
        <hr />
        <h2>Divide into sections</h2>
        <hr />
        <label htmlFor="total_sec">Total Sections</label>
        <input id={"total_sec"} type={"number"} />
        <button onClick={onDivide}>Divide</button>
        <label>Divide equally?</label>
        <input type={"checkbox"} checked={divideEq} onClick={() => setDivideEq((previous) => !previous)} readOnly />
        <div className="d-flex flex-wrap">
          {divideResult.map((item, index) => {
            return (
              <div key={"divide-" + index}>
                <h4>{"Division " + (index + 1)}</h4>
                {item.map((m, idx) => {
                  return (
                    <div
                      key={"d" + index + "m" + idx}
                      className="user-point"
                      onClick={() => {
                        let newArray = [...keepResult];
                        let nidx = _.findIndex(newArray, (o) => o.lbl === m.key);
                        if (nidx === -1) {
                          newArray.push({ lbl: m.key, set: index + 1 });
                        } else {
                          newArray = _.filter(newArray, (o) => o.lbl !== m.key);
                        }
                        setKeepResult(newArray);
                      }}
                    >
                      {m.membername}
                      <input type={"checkbox"} checked={keepResult.some((el) => el.lbl === m.key)} readOnly />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Function;
