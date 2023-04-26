import { RYModal, SpinnerBox } from "@roy1997/components";
import React, { useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FcIdea } from "react-icons/fc";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Function from "./components/Function";
import MemberModal, { MemberModalRef } from "./components/MemberModal";
import { Tdiv } from "./components/styled/AppContainer";
import { GBox } from "./components/styled/GroupBox";
import { DBContext } from "./context/dbContext";
import { useThemeContext } from "./context/themeContext";
import { useAppSelector } from "./state/hook";
import { initStorage } from "./tables";
import { MemberType } from "./tables/member";

function Cursor() {
  const cursorDotOutline = React.useRef<HTMLDivElement>(null);
  const cursorDot = React.useRef<HTMLDivElement>(null);
  const requestRef = React.useRef<number>(0);
  const previousTimeRef = React.useRef<number | undefined>();
  let [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  let cursorVisible = React.useRef(false);
  let cursorEnlarged = React.useRef(false);
  let cursorText = React.useRef(false);

  /**
   * Mouse Moves
   */
  const onMouseMove = (event: MouseEvent) => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({ x, y });
    positionDot(event);
    handleLinkHovers();
  };
  const onMouseEnter = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };
  const onMouseLeave = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };
  const onMouseDown = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };
  const onMouseUp = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };
  const onResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  /**
   * Hooks
   */
  React.useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", onResize);
    requestRef.current = requestAnimationFrame(animateDotOutline);

    // Handle Link Hovers
    handleLinkHovers();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let { x, y } = mousePosition;
  const winDimensions = { width, height };
  let endX = winDimensions.width / 2;
  let endY = winDimensions.height / 2;

  /**
   * Position Dot (cursor)
   * @param {event}
   */
  function positionDot(e: MouseEvent) {
    cursorVisible.current = true;
    toggleCursorVisibility();
    // Position the dot
    endX = e.pageX;
    endY = e.pageY;
    if (cursorDot.current) {
      cursorDot.current.style.top = endY + "px";
      cursorDot.current.style.left = endX + "px";
    }
  }

  /**
   * Toggle Cursor Visiblity
   */
  function toggleCursorVisibility() {
    if (cursorVisible.current) {
      if (cursorDot.current) cursorDot.current.style.opacity = "1";
      if (cursorDotOutline.current) cursorDotOutline.current.style.opacity = "1";
    } else {
      if (cursorDot.current) cursorDot.current.style.opacity = "0";
      if (cursorDotOutline.current) cursorDotOutline.current.style.opacity = "0";
    }
  }

  /**
   * Toggle Cursor Size
   */
  function toggleCursorSize() {
    if (cursorEnlarged.current) {
      if (cursorDot.current) {
        cursorDot.current.classList.remove("text-cursor");
        cursorDot.current.style.transform = "translate(-50%, -50%) scale(2)";
      }
      if (cursorDotOutline.current) cursorDotOutline.current.style.transform = "translate(-50%, -50%) scale(5)";
    } else {
      if (cursorDot.current) {
        cursorDot.current.classList.remove("text-cursor");
        cursorDot.current.style.transform = "translate(-50%, -50%) scale(1)";
      }
      if (cursorDotOutline.current) cursorDotOutline.current.style.transform = "translate(-50%, -50%) scale(1)";
    }
  }

  /**
   * Toggle Cursor Text
   */
  function toggleCursorText() {
    if (cursorText.current) {
      if (cursorDot.current) cursorDot.current.classList.add("text-cursor");
      if (cursorDotOutline.current) cursorDotOutline.current.style.transform = "translate(-50%, -50%) scale(5)";
    } else {
      if (cursorDot.current) cursorDot.current.classList.remove("text-cursor");
      if (cursorDotOutline.current) cursorDotOutline.current.style.transform = "translate(-50%, -50%) scale(1)";
    }
  }

  /**
   * Handle LInks
   * Applies mouseover/out hooks on all links
   * to trigger cursor animation
   */
  function handleLinkHovers() {
    document.querySelectorAll(".user-point:not(.crsl)").forEach((el) => {
      el.classList.remove("user-point");
      el.classList.add("crsl");
      el.addEventListener("mouseover", () => {
        cursorEnlarged.current = true;
        toggleCursorSize();
      });
      el.addEventListener("mouseout", () => {
        cursorEnlarged.current = false;
        toggleCursorSize();
      });
    });
    document.querySelectorAll("button:not(.crsl)").forEach((el) => {
      el.classList.add("crsl");
      el.addEventListener("mouseover", () => {
        cursorEnlarged.current = true;
        toggleCursorSize();
      });
      el.addEventListener("mouseout", () => {
        cursorEnlarged.current = false;
        toggleCursorSize();
      });
    });

    document.querySelectorAll("input:not(.crsl)").forEach((el) => {
      el.classList.add("crsl");
      el.addEventListener("mouseover", () => {
        cursorText.current = true;
        toggleCursorText();
      });
      el.addEventListener("mouseout", () => {
        cursorText.current = false;
        toggleCursorText();
      });
    });
  }

  /**
   * Animate Dot Outline
   * Aniamtes cursor outline with trailing effect.
   * @param {number} time
   */
  const animateDotOutline = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      x += (endX - x) / 4;
      y += (endY - y) / 4;
      if (cursorDotOutline.current) {
        cursorDotOutline.current.style.top = y + "px";
        cursorDotOutline.current.style.left = x + "px";
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateDotOutline);
  };

  return (
    <>
      <div ref={cursorDotOutline} id="cursor-dot-outline" />
      <div ref={cursorDot} id="cursor-dot" />
    </>
  );
}

function App() {
  const trigPoint = useState<boolean>(false);
  const local_db = initStorage(trigPoint);

  const navigate = useNavigate();

  const modalRef = useRef<MemberModalRef>();

  const appState = useAppSelector((state) => state.app);
  const { lightmode, setLightMode } = useThemeContext();
  const [loading] = useState<boolean>(false);

  const addnewgroup = () => {
    let newgroupinpt: HTMLElement | null = document.getElementById("newgroupname");

    if (newgroupinpt && (newgroupinpt as HTMLInputElement).value) {
      local_db.group.addall([{ groupname: (newgroupinpt as HTMLInputElement).value }]);
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

  const onFunction = (grpKey: string) => {
    navigate("/detail/" + grpKey);
  };

  return (
    <DBContext.Provider value={local_db}>
      <Tdiv className="App">
        <Cursor />
        {loading && <SpinnerBox />}
        <div className="flex-center-between flex-wrap p-2" style={{ background: "darkblue", color: "white" }}>
          <div className="flex-center user-point" onClick={() => navigate("/")}>
            <FcIdea size={25} />
            <span className="header">SMART IDEAS</span>
          </div>
          <div className="flex-center">
            {lightmode ? <MdLightMode className={"user-point"} onClick={() => setLightMode(false)} /> : <MdDarkMode className={"user-point"} onClick={() => setLightMode(true)} />}
            <div className="mx-2">{"Teambuilding " + appState.version.toFixed(1)}</div>
          </div>
        </div>
        <Routes>
          <Route path={"/detail/:grp"} element={<Function />} />
          <Route
            path={"/"}
            element={
              <div className="p-3">
                <Row>
                  <Col xl={3} lg={4} md={6} sm={12}>
                    <GBox className={"m-2 user-point"} onClick={onNewGroupClicked}>
                      <div className="flex-center-center flex-column h-100">
                        <AiOutlinePlus />
                        <strong>{"Add group"}</strong>
                      </div>
                    </GBox>
                  </Col>
                  {local_db.group.selectall().map((item, index) => {
                    let members = local_db.member.filterall([{ attribute: "group", text: item.key }]);
                    return (
                      <Col xl={3} lg={4} md={6} sm={12}>
                        <GBox key={"group-bx" + index} className={"m-2 user-point"} onClick={() => onFunction(item.key)}>
                          <div className="hfont">{item.groupname}</div>
                          <div className="sfont">{members.length + " members added."}</div>
                          <div className="sfont">
                            {members.map((m) => (
                              <div className="member-dot">{m.membername}</div>
                            ))}
                          </div>
                          <div
                            className="top-right-float user-point"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDetailGroup(item.key, members);
                            }}
                          >
                            <BiDotsVerticalRounded />
                          </div>
                        </GBox>
                      </Col>
                    );
                  })}
                </Row>
                <MemberModal ref={modalRef} />
              </div>
            }
          ></Route>
        </Routes>
      </Tdiv>
    </DBContext.Provider>
  );
}

export default App;
