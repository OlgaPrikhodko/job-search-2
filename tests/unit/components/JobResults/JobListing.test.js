import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/JobResults/JobListing.vue";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organisation: "AirBnB",
    locations: ["New York"],
    minimumQualifications: ["Code"],
    ...jobProps,
  });

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...jobProps,
        },
      },
    });
  };

  it("renders job title", () => {
    const jobProps = createJobProps({ title: "Vue Developer" });
    renderJobListing(jobProps);

    expect(screen.getByText("Vue Developer")).toBeInTheDocument();
  });

  it("renders job organisation", () => {
    const jobProps = createJobProps({ organisation: "AirBnB" });

    renderJobListing(jobProps);

    expect(screen.getByText("AirBnB")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const jobProps = createJobProps({ locations: ["Orlando", "NYC"] });
    renderJobListing(jobProps);
    expect(screen.getByText("Orlando")).toBeInTheDocument();
    expect(screen.getByText("NYC")).toBeInTheDocument();
  });

  it("renders job qualifications", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Code", "Develop"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Code")).toBeInTheDocument();
    expect(screen.getByText("Develop")).toBeInTheDocument();
  });
});
