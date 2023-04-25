import { RYModal, SpinnerBox } from "@roy1997/components";
import { useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FcIdea } from "react-icons/fc";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { toast } from "react-toastify";
import MemberModal, { MemberModalRef } from "./components/MemberModal";
import { Tdiv } from "./components/styled/AppContainer";
import { GBox } from "./components/styled/GroupBox";
import { useThemeContext } from "./context/themeContext";
import { useAppSelector } from "./state/hook";
import { useStorage } from "./tables";
import { MemberType } from "./tables/member";

function App() {
  const trigPoint = useState<boolean>(false);
  const local_db = useStorage(trigPoint);

  const modalRef = useRef<MemberModalRef>();

  const appState = useAppSelector((state) => state.app);
  const { lightmode, setLightMode } = useThemeContext();
  const [loading] = useState<boolean>(false);

  const addnewgroup = () => {
    let newgroupinpt: HTMLElement | null = document.getElementById("newgroupname");

    if (newgroupinpt && (newgroupinpt as HTMLInputElement).value) {
      local_db.group.add({ groupname: (newgroupinpt as HTMLInputElement).value });
    } else {
      toast("Group Name is required.");
    }
  };

  const onNewGroupClicked = () => {
    RYModal.trigger({
      title: "Add New Group",
      content: (close) => (
        <>
          <Modal.Body>
            <input id={"newgroupname"} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={close}>
              {"Close"}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                addnewgroup();
                close();
              }}
            >
              {"Save Changes"}
            </Button>
          </Modal.Footer>
        </>
      ),
    });
  };

  const onDetailGroup = (grpKey: string, mmber: Array<MemberType>) => {
    if (modalRef.current) modalRef.current.Show(grpKey, mmber);
  };

  return (
    <Tdiv className="App">
      {loading && <SpinnerBox />}
      <div className="flex-center-between flex-wrap p-2" style={{ background: "darkblue", color: "white" }}>
        <div className="flex-center">
          <FcIdea size={25} />
          <span className="header">SMART IDEAS</span>
        </div>
        <div className="flex-center">
          {lightmode ? <MdLightMode onClick={() => setLightMode(false)} /> : <MdDarkMode onClick={() => setLightMode(true)} />}
          <div className="mx-2">{"Teambuilding " + appState.version.toFixed(1)}</div>
        </div>
      </div>
      <div className="p-3">
        <Row>
          <Col xl={3} lg={4} md={6} sm={12}>
            <GBox className={"m-2"} onClick={onNewGroupClicked}>
              <div className="flex-center-center flex-column h-100">
                <AiOutlinePlus />
                <strong>{"Add group"}</strong>
              </div>
            </GBox>
          </Col>
          {local_db.group.selectall().map((item, index) => {
            let members = local_db.member.filter("group", item.key);
            return (
              <Col xl={3} lg={4} md={6} sm={12}>
                <GBox key={"group-bx" + index} className={"m-2"}>
                  <div className="hfont">{item.groupname}</div>
                  <div className="sfont">{members.length + " members added."}</div>

                  {modalRef.current && (
                    <div className="top-right-float" onClick={() => onDetailGroup(item.key, members)}>
                      <BiDotsVerticalRounded />
                    </div>
                  )}
                </GBox>
              </Col>
            );
          })}
        </Row>
      </div>
      <MemberModal ref={modalRef} />
    </Tdiv>
  );
}

export default App;
