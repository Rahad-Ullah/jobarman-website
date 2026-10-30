
import { myFetch } from "../../../../utils/myFetch";
import Jobs from "./Jobs";


/* ================= component ================= */

const JobsPage = async ({ searchParams }) => {
  const resolvedParams = searchParams ? await searchParams : {};
  const page = resolvedParams?.page || 1;
  const limit = resolvedParams?.limit || 20;

  // Fetch favourites and initial jobs in parallel on the server
  const [favRes, jobsRes] = await Promise.all([
    myFetch("/favourite", {
      method: "GET",
      cache: "no-store",
      tags: ["favoritesList"],
    }),
    myFetch(`/job-post/feed?page=${page}&limit=${limit}`, {
      method: "GET",
    }),
  ]);

  const refineFavLists = favRes?.data?.map((item) => item?.post?._id) || [];

  return (
    <>
      <Jobs
        favoritesList={refineFavLists}
        initialJobs={jobsRes?.data || []}
        initialTotalPages={jobsRes?.pagination?.totalPage || 1}
        initialTotal={jobsRes?.pagination?.total || 0}
      />
    </>
  );
};

export default JobsPage;

