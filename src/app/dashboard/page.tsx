"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  // SheetTrigger,
} from "@/components/ui/sheet";
import { Search, Settings, Inbox, Hash } from "lucide-react";
import main from "../api/main";
import Spinner from "@/components/ui/Spinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  // PaginationNext,
  // PaginationPrevious,
} from "@/components/ui/pagination";

const Page = () => {
  const [agentName, setAgentName] = useState("Agent Name");
  const [agentData, setAgentData] = useState<object | null>(null);
  const [agentLlmId, setAgentLlmId] = useState("");
  const [selectedSection, setSelectedSection] = useState("voice");
  const [isEditing, setIsEditing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [llmResponse, setLlmResponse] = useState<string | null | undefined>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [agentsPerPage, setAgentsPerPage] = useState(4);

  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = agentData?.slice(indexOfFirstAgent, indexOfLastAgent);

  useEffect(() => {
    const fetchData = async () => {
      const { agentResponses } = await main();
      // const responses = await main();
      setAgentData(agentResponses);
      setTotalPages(Math.ceil(agentResponses.length / agentsPerPage));
    };
    fetchData();
  }, [agentsPerPage]);

  async function handleLLMResponse(llmId: string) {
    try {
      const { llmResponses } = await main();
      const llmValue = await llmResponses(llmId);
      console.log("llmValue:", llmValue);

      if (llmValue.begin_message) {
        setLlmResponse(llmValue.begin_message);
      } else if (llmValue.general_prompt) {
        setLlmResponse(llmValue.general_prompt);
      } else {
        setLlmResponse("No LLM response available.");
      }
    } catch (error) {
      console.error("Error fetching LLM response:", error);
    }
  }

  // useEffect(() => {
  //   console.log("llmResponse updated:", llmResponse);
  // }, [llmResponse]);

  const renderSecondSidebar = () => {
    switch (selectedSection) {
      case "voice":
        return (
          <>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Search Voice/Language"
                  className="w-full"
                />
                <div className="space-y-2">
                  <h3 className="font-medium">English</h3>
                  <div className="space-y-2">
                    {currentAgents?.map((data) => (
                      <div
                        key={data.agent_id}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer"
                        onClick={() => {
                          setLlmResponse(null);
                          setAgentName(data.agent_name);
                          setAgentLlmId(data.response_engine.llm_id);
                        }}
                      >
                        <span>{data.agent_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Pagination className="mt-48">
              <PaginationContent>
                {/* <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem> */}
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1} className="bg-purple-500">
                    <PaginationLink
                      // className="bg-purple-500"
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {/* <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem> */}
              </PaginationContent>
            </Pagination>
          </>
        );
      default:
        return <div className="p-4">Content for {selectedSection}</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-16 bg-muted border-r flex flex-col items-center py-4 space-y-4">
        <button
          onClick={() => {
            setSelectedSection("voice");
          }}
          className={`p-2 rounded-lg ${
            selectedSection === "voice"
              ? "main-color text-primary-foreground"
              : ""
          }`}
        >
          <Search className="h-6 w-6" />
        </button>
        <button
          onClick={() => setSelectedSection("settings")}
          className={`p-2 rounded-lg ${
            selectedSection === "settings"
              ? "main-color text-primary-foreground"
              : ""
          }`}
        >
          <Settings className="h-6 w-6" />
        </button>
        <button
          onClick={() => setSelectedSection("inbox")}
          className={`p-2 rounded-lg ${
            selectedSection === "inbox"
              ? "main-color text-primary-foreground"
              : ""
          }`}
        >
          <Inbox className="h-6 w-6" />
        </button>
        <button
          onClick={() => setSelectedSection("hash")}
          className={`p-2 rounded-lg ${
            selectedSection === "hash"
              ? "main-color text-primary-foreground"
              : ""
          }`}
        >
          <Hash className="h-6 w-6" />
        </button>
      </div>

      <div className="hidden md:grid w-64 border-r">
        {renderSecondSidebar()}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            {isEditing ? (
              <Input
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                onBlur={() => setIsEditing(false)}
                className="w-48"
                autoFocus
              />
            ) : (
              <h1
                className="text-xl text-purple-500 font-semibold cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                {agentName}
              </h1>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={async () => {
                setIsChatOpen(true);
                await handleLLMResponse(agentLlmId);
              }}
            >
              Test Chat
            </Button>
            <Button className="bg-purple-500">Test Call</Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input placeholder="Enter agent name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Prompt</label>
            <Textarea
              placeholder="Enter prompt for the agent"
              className="min-h-[200px]"
            />
          </div>
        </div>
      </div>

      {/* Chat Page */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Test Chat</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {llmResponse !== null && llmResponse !== undefined ? (
                <p>{llmResponse}</p>
              ) : (
                <Spinner />
              )}
            </div>
            {/* ---------------------------------------------- */}
            {/* <div className="flex-1 overflow-auto p-4 space-y-4"></div> */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input placeholder="Type your message..." />
                <Button>Send</Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Page;
