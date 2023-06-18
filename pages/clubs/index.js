import React, { useState, useEffect } from "react";

import axios from "axios";
import { Empty } from "antd";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import { useStateWithDeps } from "swr/_internal";
import { useSelector, useDispatch } from "react-redux";
import { getSession, useSession } from "next-auth/react";
import { userRole } from "../../components/redux/features/userSlice";
import ClubsListviewNavbar from "../../components/ClubsListviewNavbar";
import ClubListViewItem from "../../components/ListView/ClubListViewItem";
import ClubListViewItemShow from "../../components/ListView/ClubListViewItemShow";
import EventItemSkeleton from "../../components/globalComponents/skeleton/eventITemSkeleton";
import useWindowDimensions from "../../hooks/useWindowDimensions ";

const ClubsList = ({ data, role }) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    dispatch(userRole(role));
  }, [role]);

  const firstItem = data[0];
  const favoriteList = useSelector((state) => state.userInfo.favoriteList);
  const clubProvienceFilter = useSelector(
    (state) => state.userInfo.clubProvienceFilter
  );

  const eventSort = useSelector((state) => state.registerEvent.eventSorted);

  const [clubs, setClubs] = useState([]);
  const [clubDataShow, setClubDataShow] = useState([]);
  const [selectedClub, setSelectedClub] = useState("");
  const [club_owner_logo, setClub_owner_logo] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [clubsList, setClubsList] = useState([]);

  useEffect(() => {
    axios.post("/api/clubs/getAllClubs").then((res) => {
      setFilteredEvents([]);
      setEvents(res.data.data);
      setEventDataShow(res.data.data[0]);
    });

    setClubs(data.filter((item) => item.club_name));
    setClub_owner_logo(clubs?.user_avatar);
    setSelectedClub(data[0]?._id);

    // setClubDataShow(firstItem);
  }, [data, firstItem]);

  useEffect(() => {
    if (clubProvienceFilter == 0) {
      setClubsList(clubs);
    } else {
      setClubsList(clubProvienceFilter);
    }
  }, [clubProvienceFilter]);

  useEffect(() => {
    if (favoriteList.length > 0) {
      setClubsList(favoriteList);
    } else {
      setClubsList(clubs);
    }
  }, [favoriteList, clubs]);

  useEffect(() => {
    setClubDataShow(clubs.find((club) => club._id === selectedClub));
  }, [selectedClub, clubs]);

  useEffect(() => {
    if (clubProvienceFilter == 0) {
      setFilteredClubs(clubs);
    } else if (clubProvienceFilter !== 0) {
      const tempClubs = clubs.filter(
        (item) => item.user_state == clubProvienceFilter
      );
      setFilteredClubs(tempClubs);
    } else if (clubProvienceFilter !== 0 && filteredClubs.length == 0) {
      toast.warning("باشگاهی با این مشخصات یافت نشد");
    }
  }, [clubProvienceFilter]);

  return (
    <div>
      <ClubsListviewNavbar />
      <Grid
        container
        direction="row-reverse"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Grid
          className="hidden-mobile"
          style={{
            position: width > 900 ? "fixed" : "static",
            margin: width > 900 ? "66px 0px 0px 0px" : "66px 20px 0px 20px",
            width: "100%",
          }}
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
        >
          {favoriteList?.length == 0 && clubs?.length == 0 ? (
            <EventItemSkeleton eventShow />
          ) : (
            clubDataShow && (
              <ClubListViewItemShow
                club_logo={club_owner_logo}
                clubDataShow={clubDataShow}
              />
            )
          )}
        </Grid>
        <Grid
          style={{
            marginTop: "48px",
            background: "#fbfbfb",
            padding: "20px",
            marginLeft: "auto",
          }}
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
        >
          <Grid container spacing={2}>
            {clubsList.length == 0 && (
              <>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <EventItemSkeleton />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <EventItemSkeleton />
                </Grid>
              </>
            )}
            {clubsList.length > 0 &&
              clubsList.map((item, i) => (
                <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
                  <ClubListViewItem
                    item={item}
                    setSelectedClub={setSelectedClub}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let userId = session?.token.restOfUser._id;

  const response = await fetch("http://localhost:3000/api/clubs/getAllClubs");
  const data = await response.json();

  if (!userId) {
    return {
      props: {
        data,
        role: "user",
      },
    };
  } else {
    const role = (
      await axios.get(`http://localhost:3000//api/users/getRole/${userId}`)
    ).data;
    return {
      props: {
        session: session,
        role: role,
        userID: userId,
        data,
      },
    };
  }
  // return {
  //   props: {
  //     data,
  //   },
  // };
}

export default ClubsList;
