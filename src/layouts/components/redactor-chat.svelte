<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import { ScrollArea } from '$lib/components/ui/scroll-area'
  import { Card } from '$lib/components/ui/card'
  import { fade } from 'svelte/transition'
  import { Bot } from 'lucide-svelte'
  import { generateGenericModel } from '$/agent/agent'
  import { modelCabinetsStore } from '$/stores/redactor/cabinets-store'
  import { modelTextureStore, setTexture, type TextureName } from '$/stores/redactor/texture-store'
  import { modelColorsStore, setColor, type Color } from '$/stores/redactor/colors-store'

  let chatInput = $state('')
  let chatHistory = $state<{ role: 'user' | 'assistant'; content: string; isTyping?: boolean }[]>(
    []
  )
  let isWaitingForResponse = $state(false)

  const simulateTyping = async (message: string) => {
    isWaitingForResponse = true
    chatHistory = [...chatHistory, { role: 'assistant', content: '', isTyping: true }]

    await new Promise((resolve) => setTimeout(resolve, 1000))

    let currentText = ''
    for (let i = 0; i < message.length; i++) {
      currentText += message[i]
      chatHistory = chatHistory.map((msg, index) =>
        index === chatHistory.length - 1 ? { ...msg, content: currentText } : msg
      )
      await new Promise((resolve) => setTimeout(resolve, 30))
    }

    chatHistory = chatHistory.map((msg, index) =>
      index === chatHistory.length - 1 ? { ...msg, isTyping: false } : msg
    )
    isWaitingForResponse = false
  }

  const handleSendMessage = async () => {
    if (chatInput.trim() && !isWaitingForResponse) {
      const userMessage = chatInput
      chatInput = ''

      chatHistory = [...chatHistory, { role: 'user', content: userMessage }]

      try {
        // Generate the kitchen model using the agent
        const generatedKitchenConfig = await generateGenericModel(userMessage)

        // Update the stores with the new configuration
        modelCabinetsStore.set({ cabinets: generatedKitchenConfig.cabinets })

        // Update texture and color stores if they exist in the response
        if (generatedKitchenConfig.textures && generatedKitchenConfig.colors) {
          // Update texture store
          if (generatedKitchenConfig.textures.length > 0) {
            const firstTexture = generatedKitchenConfig.textures[0]
            // Validate that the texture name exists in our available textures
            if (
              firstTexture.name &&
              modelTextureStore.get().availableTextures.includes(firstTexture.name as TextureName)
            ) {
              setTexture(firstTexture.name as TextureName)
            }
          }

          // Update color store
          if (generatedKitchenConfig.colors.length > 0) {
            const firstColor = generatedKitchenConfig.colors[0]
            // Validate that the color exists in our available colors
            if (
              firstColor.name &&
              modelColorsStore.get().availableColors.includes(firstColor.name as Color)
            ) {
              setColor(firstColor.name as Color)
            }
          }
        }

        const aiResponse = `I've created a kitchen design based on your request. The model, textures, and colors have been updated in the editor.`
        await simulateTyping(aiResponse)
      } catch (error) {
        console.error('Error generating kitchen model:', error)
        const aiResponse = `Sorry, I encountered an error while processing your request. Please try again.`
        await simulateTyping(aiResponse)
      }
    }
  }

  const handlePressEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && chatInput.trim() && !isWaitingForResponse) {
      handleSendMessage()
    }
  }
</script>

<div
  class="fixed right-0 bottom-0 left-0 z-10 pl-16 h-80 border-t border-border bg-card"
  transition:fade={{ duration: 150 }}
>
  <div class="flex flex-col p-4 h-full">
    <!-- Chat History -->
    <ScrollArea class="flex-1">
      <div class="space-y-4">
        {#each chatHistory as message}
          <div transition:fade={{ duration: 150 }} class="transition-all duration-200 ease-in-out">
            <Card class="p-3 transition-shadow duration-200 hover:shadow-md">
              <div class="flex gap-3 items-start">
                {#if message.role === 'assistant'}
                  <div
                    class="flex justify-center items-center w-8 h-8 rounded-full bg-primary/10 shrink-0"
                  >
                    <Bot class="w-5 h-5 text-primary" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="mb-1 text-sm font-semibold text-primary">AI Assistant</div>
                    <div class="text-sm text-foreground/90">
                      {#if message.isTyping}
                        <div class="flex gap-1 items-center h-6">
                          {#each [0, 1, 2] as i}
                            <span
                              class="w-1.5 h-1.5 rounded-full animate-bounce bg-primary/60"
                              style="animation-delay: {i * 0.2}s"
                            ></span>
                          {/each}
                        </div>
                      {:else}
                        <p class="break-words">{message.content}</p>
                      {/if}
                    </div>
                  </div>
                {:else}
                  <div
                    class="flex justify-center items-center w-8 h-8 rounded-full bg-secondary/10 text-secondary shrink-0"
                  >
                    <span class="text-sm font-semibold">Y</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="mb-1 text-sm font-semibold text-secondary">You</div>
                    <p class="text-sm break-words text-foreground/90">{message.content}</p>
                  </div>
                {/if}
              </div>
            </Card>
          </div>
        {/each}
      </div>
    </ScrollArea>

    <!-- Chat Input -->
    <div class="flex gap-2 pt-4">
      <Input
        bind:value={chatInput}
        placeholder="Type your message..."
        class="flex-1 transition-colors duration-200 bg-background/50 focus:bg-background"
        on:keydown={handlePressEnter}
        disabled={isWaitingForResponse}
      />
      <Button
        onclick={handleSendMessage}
        disabled={isWaitingForResponse}
        class="px-8 w-32 transition-all duration-200"
      >
        Send
      </Button>
    </div>
  </div>
</div>
